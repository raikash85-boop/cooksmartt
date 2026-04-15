"use client"

import { motion } from 'framer-motion'
import { BrainCircuit, CheckCircle2, TrendingDown } from 'lucide-react'
import type { CookingOption } from '@/lib/types'

interface SmartInsightsProps {
  bestOption: CookingOption
}

export function SmartInsights({ bestOption }: SmartInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-panel rounded-3xl p-8 mb-12 relative overflow-hidden glow-border"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <BrainCircuit className="w-32 h-32" />
      </div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
          <BrainCircuit className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">AI Engine Insights</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
          <h4 className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Why this is optimal</h4>
          <ul className="space-y-3">
            {bestOption.pros.slice(0, 3).map((pro, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span className="text-white/80 text-sm leading-relaxed">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4">
           <h4 className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">Financial Forecast</h4>
           <div className="glass bg-white/5 rounded-2xl p-5 border border-white/5">
             <div className="flex items-center justify-between mb-2">
               <span className="text-sm text-muted-foreground">Break-even Horizon</span>
               <span className="text-white font-bold">~{Math.max(1, Math.round(bestOption.setupCost / Math.max(1, bestOption.monthlyCost)))} Months</span>
             </div>
             <p className="text-xs text-teal-400/80 leading-relaxed">
               Based on the initial CapEx and monthly OpEx, your investment achieves zero-cost operation within this timeframe compared to sustained LPG usage.
             </p>
           </div>
           
           <div className="glass bg-teal-500/10 rounded-2xl p-5 border border-teal-500/20 flex items-center justify-between">
              <span className="text-sm text-teal-200">Long-term Efficiency Rating</span>
              <div className="flex items-center gap-2 text-teal-400 font-bold">
                 <TrendingDown className="w-4 h-4" /> 
                 {(bestOption.score * 10)}%
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  )
}
