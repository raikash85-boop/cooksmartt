"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Store, Eye, EyeOff, Loader2, CheckCircle2,
  ArrowLeft, Mail, Lock, Building2, ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { toast } from 'sonner'

type Role = 'USER' | 'SELLER'
type Mode = 'register' | 'login'

interface RegisterModalProps {
  open: boolean
  defaultRole: Role
  onClose: () => void
  onSuccess: (token: string, role: Role) => void
}

export function RegisterModal({ open, defaultRole, onClose, onSuccess }: RegisterModalProps) {
  const [mode, setMode] = useState<Mode>('register')
  const [role, setRole] = useState<Role>(defaultRole)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')

  // Reset state when dialog opens
  const handleOpenChange = (v: boolean) => {
    if (!v) {
      onClose()
      setTimeout(() => {
        setDone(false)
        setLoading(false)
        setEmail('')
        setPassword('')
        setCompanyName('')
        setMode('register')
        setRole(defaultRole)
      }, 300)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login'
      const body: Record<string, string> = { email, password, role }
      if (mode === 'register' && role === 'SELLER') body.companyName = companyName

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      if (mode === 'register') {
        setDone(true)
        toast.success('Account created!', { description: 'Welcome to CookSmart 🎉' })
        setTimeout(() => {
          onSuccess(data.token, role)
          handleOpenChange(false)
        }, 1800)
      } else {
        onSuccess(data.token, data.role)
        toast.success('Welcome back!', { description: `Logged in as ${data.role === 'SELLER' ? 'Seller' : 'Consumer'}` })
        handleOpenChange(false)
      }
    } catch {
      toast.error('Network error. Please try again.')
      setLoading(false)
    }
  }

  const isConsumer = role === 'USER'

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-md overflow-visible">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background glow */}
          <div
            className={`absolute -inset-px rounded-3xl transition-all duration-700 ${
              isConsumer
                ? 'bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20'
                : 'bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-fuchsia-500/20'
            }`}
          />

          {/* Glass card */}
          <div className="relative glass-panel rounded-3xl p-8 border border-white/10">

            {/* Success State */}
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 flex flex-col items-center gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-20 h-20 text-emerald-400" strokeWidth={1.5} />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white">You're in!</h2>
                  <p className="text-muted-foreground text-sm">
                    Account created as <span className="text-emerald-400 font-semibold">{isConsumer ? 'Consumer' : 'Seller'}</span>
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                        isConsumer ? 'bg-emerald-500/20' : 'bg-violet-500/20'
                      }`}
                    >
                      {isConsumer
                        ? <User className="w-5 h-5 text-emerald-400" />
                        : <Store className="w-5 h-5 text-violet-400" />
                      }
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white leading-tight">
                        {mode === 'register' ? 'Create Account' : 'Welcome Back'}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {isConsumer ? 'Consumer' : 'Seller / Dealer'} · CookSmart
                      </p>
                    </div>
                  </div>

                  {/* Role toggle (only in register mode) */}
                  {mode === 'register' && (
                    <div className="flex rounded-2xl bg-white/5 p-1 mb-6 border border-white/5">
                      {(['USER', 'SELLER'] as Role[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                            role === r
                              ? r === 'USER'
                                ? 'bg-emerald-500/20 text-emerald-300 shadow-inner'
                                : 'bg-violet-500/20 text-violet-300 shadow-inner'
                              : 'text-muted-foreground hover:text-white'
                          }`}
                        >
                          {r === 'USER' ? <User className="w-4 h-4" /> : <Store className="w-4 h-4" />}
                          {r === 'USER' ? 'Consumer' : 'Seller'}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Company Name (Seller only, register only) */}
                    {mode === 'register' && role === 'SELLER' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5"
                      >
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Company Name</label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Your dealership name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Password */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min. 6 characters"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/10 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Seller notice */}
                    {mode === 'register' && role === 'SELLER' && (
                      <div className="flex gap-2 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                        <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-violet-300/80">
                          Seller accounts are manually verified by our team before dealer features are unlocked.
                        </p>
                      </div>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-6 text-sm font-bold rounded-xl transition-all duration-300 ${
                        isConsumer
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black shadow-[0_0_30px_rgba(52,211,153,0.3)]'
                          : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white shadow-[0_0_30px_rgba(167,139,250,0.3)]'
                      }`}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : mode === 'register' ? (
                        `Create ${isConsumer ? 'Consumer' : 'Seller'} Account`
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>

                  {/* Toggle login/register */}
                  <div className="mt-5 text-center">
                    <button
                      type="button"
                      onClick={() => setMode(mode === 'register' ? 'login' : 'register')}
                      className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5 mx-auto"
                    >
                      {mode === 'register' ? (
                        <>Already have an account? <span className="text-primary font-semibold">Sign in</span></>
                      ) : (
                        <><ArrowLeft className="w-3.5 h-3.5" /> Back to Register</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
