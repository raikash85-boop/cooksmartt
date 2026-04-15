"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, History, Trash2, Calendar, MapPin, Download, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { SavedRecommendation } from '@/lib/types'

interface UserAccountSectionProps {
  savedRecommendations: SavedRecommendation[]
  onDelete: (id: string) => void
  onClear: () => void
}

export function UserAccountSection({ 
  savedRecommendations, 
  onDelete,
  onClear 
}: UserAccountSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm shadow-lg rounded-full"
        >
          <User className="w-4 h-4 mr-2" />
          My History
          {savedRecommendations.length > 0 && (
            <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
              {savedRecommendations.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            Your Recommendation History
          </DialogTitle>
        </DialogHeader>

        {savedRecommendations.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">No saved recommendations</h3>
            <p className="text-muted-foreground">
              Your recommendation history will appear here after you get your first results.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>

            <AnimatePresence>
              {savedRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl border border-border bg-muted/30 relative group"
                >
                  <button
                    onClick={() => onDelete(rec.id)}
                    className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>

                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl">{rec.recommendations[0]?.icon || '🍳'}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground">
                          {rec.bestOption}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          Best Match
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(rec.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {rec.formData.city}
                        </span>
                        <span>
                          {rec.formData.householdSize} members
                        </span>
                        <span>
                          ₹{rec.formData.monthlyBudget.toLocaleString()}/month
                        </span>
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {rec.recommendations.map((option) => (
                          <Badge
                            key={option.id}
                            variant="outline"
                            className="text-xs"
                          >
                            {option.icon} {option.name} - ₹{option.monthlyCost}/mo
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const data = JSON.stringify(savedRecommendations, null, 2)
                  const blob = new Blob([data], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'cooksmart-history.json'
                  a.click()
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download History
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
