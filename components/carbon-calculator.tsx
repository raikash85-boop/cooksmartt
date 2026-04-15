"use client"

import { motion } from 'framer-motion'
import { Leaf, TrendingDown, TreeDeciduous, Car, Factory } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import type { CookingOption } from '@/lib/types'

interface CarbonCalculatorProps {
  recommendations: CookingOption[]
  householdSize: number
}

const LPG_CARBON_FOOTPRINT = 50 // kg CO2 per month baseline

export function CarbonCalculator({ recommendations, householdSize }: CarbonCalculatorProps) {
  const bestOption = recommendations[0]
  const carbonSaved = LPG_CARBON_FOOTPRINT - bestOption.carbonFootprint
  const yearlyCarbon = carbonSaved * 12
  
  // Equivalents
  const treesEquivalent = Math.round(yearlyCarbon / 21) // 21 kg CO2 absorbed by 1 tree/year
  const kmDriving = Math.round(yearlyCarbon / 0.21) // 0.21 kg CO2 per km
  
  return (
    <section className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 rounded-[2rem] glow-border h-full flex flex-col relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
          <Leaf className="w-32 h-32" />
        </div>

        <div className="flex items-center gap-3 mb-6 relative z-10 w-full">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Environmental Impact</h3>
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-8 relative z-10 w-full">
          
          <div className="text-center bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />
             <div className="relative z-10">
                <p className="text-sm uppercase tracking-widest text-emerald-400/80 font-bold mb-2">Net Reduction</p>
                <div className="flex items-end justify-center gap-2">
                   <h4 className="text-5xl font-black text-white">{carbonSaved > 0 ? carbonSaved : 0}</h4>
                   <span className="text-lg text-white/50 mb-1">kg CO₂ / mo</span>
                </div>
             </div>
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/40">Alternative Emissions</p>
            {recommendations.slice(0, 3).map((option, index) => {
              const savings = LPG_CARBON_FOOTPRINT - option.carbonFootprint
              const percentage = (savings / LPG_CARBON_FOOTPRINT) * 100
              
              return (
                <div key={option.id} className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-2">
                      <span className="text-lg opacity-80">{option.icon}</span>
                      <span className="font-medium text-white/90 text-sm">{option.name}</span>
                    </span>
                    <span className="text-sm text-emerald-400 font-bold tracking-wide">
                      -{Math.round(percentage)}%
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className="h-2 bg-emerald-950 [&>div]:bg-emerald-400"
                  />
                </div>
              )
            })}
          </div>

          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
             <div className="flex items-start gap-4">
               <TreeDeciduous className="w-8 h-8 text-emerald-500/50 shrink-0" />
               <div>
                  <p className="text-2xl font-bold text-white">{treesEquivalent}</p>
                  <p className="text-xs text-white/40 leading-snug">trees planted per year equivalent</p>
               </div>
             </div>
             <div className="flex items-start gap-4">
               <Car className="w-8 h-8 text-emerald-500/50 shrink-0" />
               <div>
                  <p className="text-2xl font-bold text-white">{kmDriving.toLocaleString()}</p>
                  <p className="text-xs text-white/40 leading-snug">km driven in a car equivalent</p>
               </div>
             </div>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
