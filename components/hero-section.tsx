"use client"

import { motion } from 'framer-motion'
import { Flame, Leaf, Sun, Zap, ArrowRight, Activity, BatteryCharging } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  onGetStarted: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Deep animated background */}
      <div className="absolute inset-0 animated-gradient-bg opacity-40 mix-blend-screen" />
      <div className="absolute inset-0 bg-grid-cyber opacity-[0.05]" />
      
      {/* Floating glass cards (background parallax) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-3xl glass flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.15)] glow-border"
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Leaf className="w-12 h-12 text-emerald-400 opacity-80" />
        </motion.div>

        <motion.div
          className="absolute top-[25%] right-[15%] w-24 h-24 rounded-2xl glass flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.15)] glow-border"
          animate={{ y: [0, 40, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Activity className="w-10 h-10 text-sky-400 opacity-80" />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[20%] w-28 h-28 rounded-[2rem] glass flex items-center justify-center shadow-[0_0_35px_rgba(250,204,21,0.15)] glow-border"
          animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Sun className="w-10 h-10 text-amber-400 opacity-80" />
        </motion.div>

        <motion.div
          className="absolute bottom-[30%] right-[10%] w-36 h-36 rounded-full glass flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.15)] glow-border"
          animate={{ y: [0, 25, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <BatteryCharging className="w-14 h-14 text-purple-400 opacity-80" />
        </motion.div>
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 text-sm font-medium text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          CookSmart Engine Alpha V2.0
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
        >
          The Future of <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 pb-2 drop-shadow-sm">
            Sustainable Cooking
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Break free from LPG dependency. Engineer your kitchen with data-driven recommendations on Biogas, Induction, and Solar cooking arrays.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative inline-block group"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-30 blur-xl group-hover:opacity-60 transition duration-500"></div>
          <Button 
            onClick={onGetStarted}
            className="relative px-8 py-7 bg-white text-black hover:bg-white/90 text-lg rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:scale-105 transition-all duration-300"
          >
            Deploy Optimization
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Floating Dock / Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="mt-20 w-full max-w-3xl glass-panel rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-2xl relative overflow-hidden glow-border"
        >
          {/* subtle line glow */}
          <div className="absolute top-0 left-[20%] w-[60%] h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
          
          <div className="text-left">
            <div className="text-3xl font-bold text-white mb-1 tracking-tight">50,000+</div>
            <div className="text-sm font-medium text-emerald-400">Households Upgraded</div>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div className="text-center">
             <div className="text-3xl font-bold text-white mb-1 tracking-tight">₹2Cr+</div>
            <div className="text-sm font-medium text-cyan-400">Capital Saved</div>
          </div>
          <div className="h-12 w-px bg-white/10" />
          <div className="text-right">
             <div className="text-3xl font-bold text-white mb-1 tracking-tight">42%</div>
            <div className="text-sm font-medium text-teal-400">Carbon Reduction</div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
