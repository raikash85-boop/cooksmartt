"use client"

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Star, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DEALERS } from '@/lib/data'
import type { Dealer } from '@/lib/types'

interface DealerLocatorProps {
  city: string
}

export function DealerLocator({ city }: DealerLocatorProps) {
  
  const filteredDealers = useMemo(() => {
    return DEALERS.filter(dealer => dealer.city === city).slice(0, 5) // Show top 5
  }, [city])

  const openInMaps = (dealer: Dealer) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${dealer.name} ${dealer.address} ${dealer.city}`
    )}`
    window.open(url, '_blank')
  }

  return (
    <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       className="glass-panel rounded-[2rem] p-6 glow-border h-[500px] flex flex-col relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
          <MapPin className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">Suppliers in {city}</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar relative z-10">
         {filteredDealers.length > 0 ? (
           filteredDealers.map((dealer, index) => (
             <div key={dealer.id} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
               <div className="flex justify-between items-start mb-2">
                 <h4 className="text-sm font-bold text-white">{dealer.name}</h4>
                 <div className="flex items-center gap-1 text-orange-400 text-xs">
                   <Star className="w-3 h-3 fill-current" />
                   {dealer.rating}
                 </div>
               </div>
               <p className="text-xs text-white/50 mb-3 truncate">{dealer.address}</p>
               <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="h-7 text-xs flex-1 bg-transparent border-white/10 text-white hover:bg-white/10" onClick={() => window.location.href = `tel:${dealer.phone}`}>
                      <Phone className="w-3 h-3 mr-1" /> Call
                   </Button>
                   <Button size="sm" className="h-7 text-xs flex-1 bg-orange-500/20 text-orange-400 hover:bg-orange-500/30" onClick={() => openInMaps(dealer)}>
                      <Navigation className="w-3 h-3 mr-1" /> Map
                   </Button>
               </div>
             </div>
           ))
         ) : (
           <div className="h-full flex flex-col items-center justify-center text-center">
             <MapPin className="w-8 h-8 text-white/20 mb-2" />
             <p className="text-sm text-white/50">No verified suppliers found in this node.</p>
           </div>
         )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
      `}</style>
    </motion.div>
  )
}
