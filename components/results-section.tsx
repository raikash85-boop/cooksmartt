"use client"

import { motion } from 'framer-motion'
import { Check, X, Award, TrendingUp, Leaf, Share2, Printer, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import type { CookingOption, UserFormData } from '@/lib/types'
import { calculateSavings, getScoreLabel } from '@/lib/calculator'
import { LPG_MONTHLY_COST } from '@/lib/data'

interface ResultsSectionProps {
  recommendations: CookingOption[]
  formData: UserFormData
  onShare: () => void
}

export function ResultsSection({ recommendations, formData, onShare }: ResultsSectionProps) {
  const bestOption = recommendations[0]
  const otherOptions = recommendations.slice(1)

  const handlePrint = () => {
    window.print()
  }

  const bestSavings = calculateSavings(bestOption.monthlyCost, LPG_MONTHLY_COST)

  return (
    <section id="results-section" className="py-24 px-4 bg-background relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-12 flex justify-between items-end"
        >
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 text-teal-300 mb-4 shadow-[0_0_15px_rgba(20,184,166,0.15)]"
            >
              <Zap className="w-4 h-4" />
              <span className="font-semibold tracking-wide text-xs uppercase">Engine Output Generated</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
              Optimized Array
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Configured for a {formData.householdSize}-person node in {formData.city} at ₹{formData.monthlyBudget.toLocaleString()} limit.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="hidden md:flex gap-4">
            <Button onClick={onShare} className="glass text-teal-400 hover:bg-teal-500/20 hover:text-teal-300">
              <Share2 className="mr-2 w-4 h-4" /> Share Spec
            </Button>
            <Button onClick={handlePrint} variant="outline" className="border-white/10 text-white hover:bg-white/5">
              <Printer className="mr-2 w-4 h-4" /> Print
            </Button>
          </div>
        </motion.div>

        {/* Top Recommendation (Hero Card layout) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative rounded-[2.5rem] overflow-hidden mb-12 glow-border shadow-[0_20px_50px_rgba(20,184,166,0.1)] group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-emerald-600/5 to-cyan-500/10 opacity-50 block mix-blend-overlay" />
          
          <div className="glass-panel w-full p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-8 items-center bg-[#0a0f12]/80">
            {/* Massive Icon & Name */}
            <div className="md:w-1/3 flex flex-col items-center md:items-start border-r border-white/10 md:pr-8">
              <div className="inline-flex items-center justify-center font-bold text-xs uppercase tracking-[0.2em] text-teal-400 bg-teal-400/10 px-4 py-2 rounded-full mb-8">
                <Award className="w-4 h-4 mr-2" /> Primary Recommendation
              </div>
              <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${bestOption.color} flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(16,185,129,0.3)] mb-8 transform group-hover:scale-105 transition duration-500`}>
                {bestOption.icon}
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-2 text-center md:text-left">{bestOption.name}</h3>
              <div className="flex items-center gap-4 mt-2">
                 <Badge variant="outline" className="text-teal-300 border-teal-500/30 bg-teal-500/10 px-3 py-1 text-sm">{getScoreLabel(bestOption.score)} Match</Badge>
              </div>
            </div>

            {/* Metrics */}
            <div className="md:w-2/3 grid grid-cols-2 gap-4 w-full">
              {/* Cost Box */}
               <div className="col-span-2 md:col-span-1 p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="w-16 h-16" /></div>
                  <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">OpEx (Monthly Cost)</p>
                  <p className="text-3xl font-black text-white">₹{bestOption.monthlyCost.toLocaleString()}</p>
                  {bestSavings > 0 && <p className="text-emerald-400 text-sm mt-3 font-semibold">+ ₹{bestSavings.toLocaleString()} yearly savings</p>}
               </div>
               
               {/* Setup Box */}
               <div className="col-span-2 md:col-span-1 p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <p className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">CapEx (Setup Cost)</p>
                  <p className="text-3xl font-black text-white">₹{bestOption.setupCost.toLocaleString()}</p>
                  <p className="text-teal-400 text-sm mt-3 font-semibold">Subsidies up to ₹{bestOption.subsidyAmount.toLocaleString()}</p>
               </div>

               {/* Impact Box */}
               <div className="col-span-2 p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-emerald-400/80 mb-1 uppercase tracking-wider">Environmental Impact</p>
                     <div className="flex items-center gap-3">
                        <Leaf className="w-8 h-8 text-emerald-400" />
                        <p className="text-2xl font-bold text-emerald-50">
                          {bestOption.carbonFootprint === 0 ? 'Zero Emissions Output' : `${bestOption.carbonFootprint} kg CO₂ / mo footprint`}
                        </p>
                     </div>
                  </div>
                  <Progress value={bestOption.score * 10} className="w-32 h-3 bg-emerald-950 [&>div]:bg-emerald-400" />
               </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Options Grid (Horizontal Scroll or Flex Row on large screens) */}
        {otherOptions.length > 0 && (
          <div className="pt-8 mb-12">
            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8 pl-2">Alternative Configurations</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherOptions.map((option, index) => {
                const savings = calculateSavings(option.monthlyCost, LPG_MONTHLY_COST)
                return (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="glass-card rounded-[2rem] p-6 hover:bg-white/10 transition-colors duration-300 relative overflow-hidden cursor-default group"
                  >
                    <div className="flex items-start justify-between mb-8">
                       <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center text-3xl shadow-lg ring-1 ring-white/20 transform group-hover:-rotate-6 group-hover:scale-110 transition duration-300`}>
                          {option.icon}
                       </div>
                       <Badge variant="outline" className="border-white/10 text-white/70 bg-white/5">{option.score}/10</Badge>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1">{option.name}</h3>
                    <p className="text-teal-400 text-sm font-medium mb-6">₹{option.monthlyCost.toLocaleString()} / mo</p>
                    
                    <div className="w-full h-px bg-white/10 mb-6" />

                    <div className="space-y-3">
                       <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Setup</span>
                          <span className="text-white font-medium">₹{option.setupCost.toLocaleString()}</span>
                       </div>
                       <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">CO₂ Output</span>
                          <span className="text-emerald-400 font-medium">{option.carbonFootprint} kg</span>
                       </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

