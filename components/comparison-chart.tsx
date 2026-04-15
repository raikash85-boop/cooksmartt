"use client"

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { CookingOption } from '@/lib/types'

interface ComparisonChartProps {
  recommendations: CookingOption[]
}

export function ComparisonChart({ recommendations }: ComparisonChartProps) {
  const chartData = recommendations.map(option => ({
    name: option.name,
    'Monthly Cost': option.monthlyCost,
    'Setup Cost': option.setupCost / 10, // Scale down for better visualization
    score: option.score,
  }))

  return (
    <section className="py-8 relative z-10 w-full">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left mb-10 pl-2"
        >
          <h2 className="text-3xl font-extrabold text-white mb-2">
            Cost & CapEx Analysis
          </h2>
          <p className="text-teal-500/80 uppercase tracking-widest text-sm font-semibold">
            Visual breakdown of monthly op-ex and initial setup load
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-panel rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] glow-border"
        >
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorSetup" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 13 }}
                axisLine={false}
                tickLine={false}
                dx={-10}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                contentStyle={{
                  backgroundColor: 'rgba(10, 15, 18, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'Setup Cost') {
                    return [`₹${(value * 10).toLocaleString()}`, name]
                  }
                  return [`₹${value.toLocaleString()}`, name]
                }}
                itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}
                labelStyle={{ color: 'rgba(255,255,255,0.6)', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar 
                dataKey="Monthly Cost" 
                fill="url(#colorMonthly)" 
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
                barSize={40}
              />
              <Bar 
                dataKey="Setup Cost" 
                fill="url(#colorSetup)" 
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-between items-center mt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs text-white/40 uppercase tracking-wider">Live rendering</span>
            </div>
            <p className="text-xs text-teal-500/50">
              * Setup CapEx visual mapping divided by 10
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
