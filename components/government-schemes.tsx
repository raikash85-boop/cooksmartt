"use client"

import { motion } from 'framer-motion'
import { Building2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GOVERNMENT_SCHEMES } from '@/lib/data'

interface GovernmentSchemesProps {
  city: string
}

export function GovernmentSchemes({ city }: GovernmentSchemesProps) {
  // Get state from city
  const cityToState: Record<string, string> = {
    Mumbai: 'Maharashtra',
    Pune: 'Maharashtra',
    Delhi: 'Delhi',
    Chennai: 'Tamil Nadu',
    Bangalore: 'Karnataka',
  }
  
  const state = cityToState[city] || 'All India'
  
  // Filter schemes applicable to the user's state
  const applicableSchemes = GOVERNMENT_SCHEMES.filter(
    scheme => scheme.states.includes('All India') || scheme.states.includes(state)
  ).slice(0, 5)

  return (
    <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       className="glass-panel rounded-[2rem] p-6 glow-border h-[500px] flex flex-col relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
          <Building2 className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">Govt. Subsidies</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar relative z-10">
        {applicableSchemes.length > 0 ? (
          applicableSchemes.map((scheme, index) => (
             <div key={scheme.id} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h4 className="text-sm font-bold text-white leading-tight">{scheme.name}</h4>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded shrink-0">{scheme.subsidy}</span>
                  </div>
                  <p className="text-xs text-white/50 mb-4 line-clamp-2">{scheme.description}</p>
                </div>
                <Button 
                   variant="ghost" 
                   size="sm" 
                   className="w-full text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 bg-purple-500/10 justify-between h-8"
                   onClick={() => window.open(scheme.link, '_blank')}
                >
                   Verify Eligibility <ExternalLink className="w-3 h-3" />
                </Button>
             </div>
          ))
        ) : (
           <div className="h-full flex flex-col items-center justify-center text-center">
             <Building2 className="w-8 h-8 text-white/20 mb-2" />
             <p className="text-sm text-white/50">No known schemes in this region.</p>
           </div>
        )}
      </div>
    </motion.div>
  )
}
