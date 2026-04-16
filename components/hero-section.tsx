"use client"

import { motion } from 'framer-motion'
import { Leaf, Sun, Activity, BatteryCharging, ArrowRight, Users, Store, Sparkles } from 'lucide-react'

interface HeroSectionProps {
  onGetStarted: () => void
  onRegisterConsumer: () => void
  onRegisterSeller: () => void
}

export function HeroSection({ onGetStarted, onRegisterConsumer, onRegisterSeller }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Deep animated background */}
      <div className="absolute inset-0 animated-gradient-bg opacity-40 mix-blend-screen" />
      <div className="absolute inset-0 bg-grid-cyber opacity-[0.05]" />

      {/* Radial spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-radial from-teal-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Floating glass cards (background parallax) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[15%] left-[8%] w-32 h-32 rounded-3xl glass flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.15)] glow-border"
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Leaf className="w-12 h-12 text-emerald-400 opacity-80" />
        </motion.div>

        <motion.div
          className="absolute top-[20%] right-[12%] w-24 h-24 rounded-2xl glass flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.15)] glow-border"
          animate={{ y: [0, 40, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <Activity className="w-10 h-10 text-sky-400 opacity-80" />
        </motion.div>

        <motion.div
          className="absolute bottom-[18%] left-[18%] w-28 h-28 rounded-[2rem] glass flex items-center justify-center shadow-[0_0_35px_rgba(250,204,21,0.15)] glow-border"
          animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <Sun className="w-10 h-10 text-amber-400 opacity-80" />
        </motion.div>

        <motion.div
          className="absolute bottom-[28%] right-[8%] w-36 h-36 rounded-full glass flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.15)] glow-border"
          animate={{ y: [0, 25, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
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
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 text-sm font-medium text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
          CookSmart Engine Alpha V2.0
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
        >
          The Future of{' '}
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 pb-2 drop-shadow-sm">
            Sustainable Cooking
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Break free from LPG dependency. Engineer your kitchen with data-driven recommendations
          on Biogas, Induction, and Solar cooking alternatives.
        </motion.p>

        {/* ── Dual Registration CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 w-full max-w-xl"
        >
          {/* Consumer button */}
          <div className="relative group flex-1 w-full sm:w-auto">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-25 blur-xl group-hover:opacity-60 transition-all duration-500" />
            <button
              id="register-consumer-btn"
              onClick={onRegisterConsumer}
              className="relative w-full flex items-center justify-center gap-3 px-7 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-base rounded-2xl shadow-[0_0_30px_rgba(52,211,153,0.25)] hover:shadow-[0_0_50px_rgba(52,211,153,0.4)] hover:scale-[1.03] transition-all duration-300 group"
            >
              <div className="w-9 h-9 bg-black/10 rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold opacity-70 tracking-widest uppercase leading-none mb-0.5">For Households</div>
                <div className="text-base font-bold leading-tight">Register as Consumer</div>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Seller button */}
          <div className="relative group flex-1 w-full sm:w-auto">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-20 blur-xl group-hover:opacity-50 transition-all duration-500" />
            <button
              id="register-seller-btn"
              onClick={onRegisterSeller}
              className="relative w-full flex items-center justify-center gap-3 px-7 py-5 bg-white/5 hover:bg-white/10 border border-violet-500/40 hover:border-violet-400/70 text-white font-bold text-base rounded-2xl shadow-[0_0_20px_rgba(167,139,250,0.1)] hover:shadow-[0_0_40px_rgba(167,139,250,0.25)] hover:scale-[1.03] transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="w-9 h-9 bg-violet-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Store className="w-5 h-5 text-violet-300" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold text-violet-400 tracking-widest uppercase leading-none mb-0.5">For Dealers</div>
                <div className="text-base font-bold leading-tight">Register as Seller</div>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto opacity-50 text-violet-300 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* "Already using CookSmart?" subtle link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mb-12"
        >
          <button
            onClick={onGetStarted}
            className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5 mx-auto group"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-500 group-hover:text-teal-400 transition-colors" />
            Or explore recommendations without signing up
            <ArrowRight className="w-3 h-3 opacity-50 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Floating Dock / Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
          className="w-full max-w-3xl glass-panel rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-2xl relative overflow-hidden glow-border"
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
