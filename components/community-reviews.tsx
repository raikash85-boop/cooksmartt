"use client"

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, Star, MapPin } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { REVIEWS } from '@/lib/data'

interface CommunityReviewsProps {
  city: string
}

export function CommunityReviews({ city }: CommunityReviewsProps) {
  const filteredReviews = useMemo(() => {
    return REVIEWS.filter(review => review.city === city).slice(0, 5)
  }, [city])

  return (
    <motion.div
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true }}
       className="glass-panel rounded-[2rem] p-6 glow-border h-[500px] flex flex-col relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
          <Users className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">Community Logs</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar relative z-10">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
             <div key={review.id} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 border border-white/10">
                         <AvatarFallback className="bg-pink-500/20 text-pink-400 text-xs font-bold">
                            {review.userName.slice(0, 2).toUpperCase()}
                         </AvatarFallback>
                      </Avatar>
                      <div>
                         <p className="text-sm font-bold text-white leading-none">{review.userName}</p>
                         <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">{review.cookingMethod}</p>
                      </div>
                   </div>
                   <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                         <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-pink-400 text-pink-400' : 'text-white/20'}`} />
                      ))}
                   </div>
                </div>
                <p className="text-xs text-white/70 italic">&quot;{review.comment}&quot;</p>
             </div>
          ))
        ) : (
           <div className="h-full flex flex-col items-center justify-center text-center">
             <Users className="w-8 h-8 text-white/20 mb-2" />
             <p className="text-sm text-white/50">No verified logs in this region yet.</p>
           </div>
        )}
      </div>
    </motion.div>
  )
}
