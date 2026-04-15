"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, CreditCard, Calendar, Percent, IndianRupee } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { CookingOption } from '@/lib/types'
import { calculateEMI } from '@/lib/calculator'

interface EMICalculatorProps {
  recommendations: CookingOption[]
}

export function EMICalculator({ recommendations }: EMICalculatorProps) {
  const [selectedOption, setSelectedOption] = useState<string>(recommendations[0]?.id || '')
  const [tenure, setTenure] = useState(12)
  const [interestRate, setInterestRate] = useState(12)

  const option = recommendations.find(r => r.id === selectedOption)
  const emiDetails = option ? calculateEMI(option.setupCost, interestRate, tenure) : null

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
          <Calculator className="w-32 h-32" />
        </div>

        <div className="flex items-center gap-3 mb-6 relative z-10 w-full">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Calculator className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Financing Module</h3>
        </div>

        <div className="flex-1 flex flex-col relative z-10 w-full gap-8">
            <div className="space-y-6 flex-1">
              {/* Option Selection */}
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-white/50 mb-3">
                  <CreditCard className="w-4 h-4" />
                  Target Array
                </label>
                <Select value={selectedOption} onValueChange={setSelectedOption}>
                  <SelectTrigger className="w-full h-12 rounded-xl bg-white/5 border-white/10 text-white focus:ring-cyan-500/50">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-white/10 text-white">
                    {recommendations.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id} className="focus:bg-white/10 py-3">
                        <div className="flex items-center w-full justify-between gap-4">
                           <span>{opt.icon} {opt.name}</span>
                           <span className="text-cyan-400 ml-auto">₹{opt.setupCost.toLocaleString()}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tenure Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-white/50">
                    <Calendar className="w-4 h-4" />
                    Tenure
                  </label>
                  <span className="text-sm font-bold text-cyan-400">{tenure} months</span>
                </div>
                <div className="py-2">
                  <Slider
                    value={[tenure]}
                    onValueChange={(value) => setTenure(value[0])}
                    min={3} max={24} step={3}
                  />
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-white/50">
                    <Percent className="w-4 h-4" />
                    Interest Rate
                  </label>
                  <span className="text-sm font-bold text-cyan-400">{interestRate}% p.a.</span>
                </div>
                <div className="py-2">
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={0} max={24} step={1}
                  />
                </div>
              </div>
            </div>

            {/* Results Output Block */}
            {emiDetails && (
               <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 mt-auto">
                 <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400/80">Monthly EMI</p>
                    <div className="flex items-center justify-center gap-1">
                      <IndianRupee className="w-5 h-5 text-white" />
                      <span className="text-3xl font-black text-white">
                        {emiDetails.emi.toLocaleString()}
                      </span>
                    </div>
                 </div>

                 <div className="w-full h-px bg-white/10 mb-4" />
                 
                 <div className="space-y-2">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-white/60">Principal</span>
                     <span className="text-white font-medium text-right">₹{emiDetails.principal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-white/60">Interest Total</span>
                     <span className="text-cyan-400 font-medium text-right">+ ₹{emiDetails.totalInterest.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm font-bold pt-2">
                     <span className="text-white">Gross Payable</span>
                     <span className="text-white text-right">₹{emiDetails.totalAmount.toLocaleString()}</span>
                   </div>
                 </div>
               </div>
            )}
        </div>
      </motion.div>
    </section>
  )
}
