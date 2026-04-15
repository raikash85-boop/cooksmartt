"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Wallet, MapPin, Clock, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import type { UserFormData } from '@/lib/types'
import { CITIES, COOKING_FREQUENCIES } from '@/lib/types'

interface RecommendationFormProps {
  onSubmit: (data: UserFormData) => void
  isLoading: boolean
}

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const [step, setStep] = useState(1)
  const [householdSize, setHouseholdSize] = useState(4)
  const [monthlyBudget, setMonthlyBudget] = useState(3000)
  const [city, setCity] = useState('')
  const [cookingFrequency, setCookingFrequency] = useState('')

  const handleNext = () => setStep((s) => Math.min(s + 1, 4))
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1))

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!city || !cookingFrequency) return
    
    onSubmit({
      householdSize,
      monthlyBudget,
      city,
      cookingFrequency,
    })
  }

  const isStepValid = () => {
    if (step === 1) return city !== ''
    if (step === 2) return true
    if (step === 3) return true
    if (step === 4) return cookingFrequency !== ''
    return false
  }

  const steps = [
    { id: 1, title: 'Location', icon: MapPin },
    { id: 2, title: 'Household', icon: Users },
    { id: 3, title: 'Budget', icon: Wallet },
    { id: 4, title: 'Habits', icon: Clock },
  ]

  return (
    <section id="form-section" className="py-24 px-4 min-h-[90vh] flex items-center relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-cyber opacity-[0.03]" />
      
      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Wizard Stepper */}
        <div className="w-full md:w-2/3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 text-left">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 mb-4 tracking-tight">
                Configure Your Setup
              </h2>
              <p className="text-muted-foreground text-lg font-light">
                Let's calibrate the engine for your specific household needs.
              </p>
            </div>

            {/* Stepper Progress Map */}
            <div className="flex gap-2 mb-10 overflow-hidden rounded-full glass p-2 w-max">
              {steps.map((s) => {
                const isActive = step === s.id
                const isPast = step > s.id
                return (
                  <div 
                    key={s.id} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${isActive ? 'bg-teal-500/20 text-teal-300 ring-1 ring-teal-500/50' : isPast ? 'text-teal-500/60' : 'text-muted-foreground opacity-50'}`}
                  >
                    <s.icon className={`w-4 h-4 ${isActive || isPast ? 'opacity-100' : 'opacity-50'}`} />
                    <span className="text-sm font-medium hidden md:block">{s.title}</span>
                  </div>
                )
              })}
            </div>

            <div className="glass-panel rounded-3xl p-8 md:p-10 shadow-2xl relative glow-border min-h-[400px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                    <h3 className="text-2xl font-semibold text-white">Where are you deploying this?</h3>
                    <p className="text-muted-foreground">Logistics and subsidies vary by region.</p>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="w-full h-16 text-xl rounded-2xl border-white/10 bg-white/5 focus:ring-teal-500/50 text-white">
                        <SelectValue placeholder="Select your operational city" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] border-white/10 text-white">
                        {CITIES.map((cityName) => (
                          <SelectItem key={cityName} value={cityName} className="text-lg py-3 focus:bg-white/10">
                            {cityName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                    <h3 className="text-2xl font-semibold text-white">Household Capacity</h3>
                    <p className="text-muted-foreground">Select the number of members in your household to scale the energy load.</p>
                    <div className="pt-8 pb-4">
                      <Slider
                        value={[householdSize]}
                        onValueChange={(value) => setHouseholdSize(value[0])}
                        min={1} max={10} step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-teal-400 font-medium">
                      <span>1 person</span>
                      <span className="text-xl font-bold text-white">{householdSize} Members</span>
                      <span>10 people</span>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                     <h3 className="text-2xl font-semibold text-white">Monthly Fuel Budget</h3>
                    <p className="text-muted-foreground">Determine your financial boundaries to optimize ROI.</p>
                    <div className="pt-8 pb-4">
                      <Slider
                        value={[monthlyBudget]}
                        onValueChange={(value) => setMonthlyBudget(value[0])}
                        min={500} max={10000} step={100}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-teal-400 font-medium">
                      <span>₹500</span>
                      <span className="text-xl font-bold text-white">₹{monthlyBudget.toLocaleString()}</span>
                      <span>₹10,000</span>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
                    <h3 className="text-2xl font-semibold text-white">Cooking Frequency</h3>
                    <p className="text-muted-foreground">How often will the array be firing?</p>
                    <Select value={cookingFrequency} onValueChange={setCookingFrequency}>
                      <SelectTrigger className="w-full h-16 text-xl rounded-2xl border-white/10 bg-white/5 focus:ring-teal-500/50 text-white">
                        <SelectValue placeholder="Select usage pattern" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] border-white/10 text-white">
                        {COOKING_FREQUENCIES.map((freq) => (
                          <SelectItem key={freq.value} value={freq.value} className="text-lg py-3 focus:bg-white/10">
                            {freq.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Footer */}
              <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                <Button 
                   variant="ghost" 
                   onClick={handlePrev} 
                   disabled={step === 1}
                   className="text-white hover:bg-white/5 disabled:opacity-30"
                >
                  <ChevronLeft className="mr-2 w-4 h-4" /> Back
                </Button>

                {step < 4 ? (
                  <Button 
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 ring-1 ring-teal-500/50"
                  >
                    Continue <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={!isStepValid() || isLoading}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:opacity-90 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    {isLoading ? (
                      <><Spinner className="mr-2" /> Analyzing Data...</>
                    ) : (
                      <><Sparkles className="mr-2 w-4 h-4" /> Generate Insights</>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Live Preview Snapshot */}
        <div className="w-full md:w-1/3 hidden md:block">
           <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="sticky top-32 glass-card rounded-3xl p-6 glow-border mt-20"
          >
            <h4 className="text-sm uppercase tracking-widest text-teal-500/80 font-bold mb-6">Live Blueprint</h4>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4 opacity-70" />
                  <span className="text-sm">Location</span>
                </div>
                <span className="text-white font-medium">{city || '—'}</span>
              </div>
              <div className="w-full h-px bg-white/5" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-4 h-4 opacity-70" />
                  <span className="text-sm">Members</span>
                </div>
                <span className="text-white font-medium">{step > 1 ? householdSize : '—'}</span>
              </div>
              <div className="w-full h-px bg-white/5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Wallet className="w-4 h-4 opacity-70" />
                  <span className="text-sm">Budget</span>
                </div>
                <span className={step > 2 ? "text-emerald-400 font-bold" : "text-white font-medium"}>
                  {step > 2 ? `₹${monthlyBudget.toLocaleString()}` : '—'}
                </span>
              </div>
              <div className="w-full h-px bg-white/5" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-4 h-4 opacity-70" />
                  <span className="text-sm">Usage</span>
                </div>
                <span className="text-white font-medium text-right max-w-[120px] truncate">
                  {step > 3 && cookingFrequency ? COOKING_FREQUENCIES.find(f => f.value === cookingFrequency)?.label : '—'}
                </span>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-200/70 text-center leading-relaxed">
              We cross-reference this data against 3+ sustainable energy sources to output the most optimized array.
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
