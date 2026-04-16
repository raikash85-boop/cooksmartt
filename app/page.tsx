"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import { HeroSection } from '@/components/hero-section'
import { RecommendationForm } from '@/components/recommendation-form'
import { ResultsSection } from '@/components/results-section'
import { ComparisonChart } from '@/components/comparison-chart'
import { CarbonCalculator } from '@/components/carbon-calculator'
import { EMICalculator } from '@/components/emi-calculator'
import { DealerLocator } from '@/components/dealer-locator'
import { GovernmentSchemes } from '@/components/government-schemes'
import { CommunityReviews } from '@/components/community-reviews'
import { SmartInsights } from '@/components/smart-insights'
import { UserAccountSection } from '@/components/user-account-section'
import { RegisterModal } from '@/components/register-modal'
import { Footer } from '@/components/footer'
import { calculateRecommendations } from '@/lib/calculator'
import type { UserFormData, CookingOption, SavedRecommendation } from '@/lib/types'

type Role = 'USER' | 'SELLER'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<UserFormData | null>(null)
  const [recommendations, setRecommendations] = useState<CookingOption[]>([])
  const [savedRecommendations, setSavedRecommendations] = useState<SavedRecommendation[]>([])

  // Auth / registration modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [modalRole, setModalRole] = useState<Role>('USER')
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [loggedInRole, setLoggedInRole] = useState<Role | null>(null)

  const formRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Load saved recommendations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cooksmart-history')
    if (saved) {
      try {
        setSavedRecommendations(JSON.parse(saved))
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, [])

  // Save to localStorage when recommendations change
  useEffect(() => {
    if (savedRecommendations.length > 0) {
      localStorage.setItem('cooksmart-history', JSON.stringify(savedRecommendations))
    }
  }, [savedRecommendations])

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openConsumerModal = () => {
    setModalRole('USER')
    setModalOpen(true)
  }

  const openSellerModal = () => {
    setModalRole('SELLER')
    setModalOpen(true)
  }

  const handleAuthSuccess = (token: string, role: Role) => {
    setAuthToken(token)
    setLoggedInRole(role)
    // Persist token for API calls
    localStorage.setItem('cooksmart-token', token)
    localStorage.setItem('cooksmart-role', role)
    // Consumer → scroll to form; Seller → could redirect to dashboard in future
    if (role === 'USER') scrollToForm()
  }

  const handleFormSubmit = async (data: UserFormData) => {
    setIsLoading(true)
    setFormData(data)
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const results = calculateRecommendations(data)
    setRecommendations(results)
    setIsLoading(false)
    
    // Save to history
    const newSavedRec: SavedRecommendation = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      formData: data,
      recommendations: results,
      bestOption: results[0]?.name || 'N/A',
    }
    setSavedRecommendations(prev => [newSavedRec, ...prev.slice(0, 9)]) // Keep last 10
    
    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
    
    toast.success('Recommendations ready!', {
      description: `Best option for you: ${results[0]?.name}`,
    })
  }

  const handleWhatsAppShare = useCallback(() => {
    if (!recommendations.length || !formData) return
    
    const best = recommendations[0]
    const message = `🍳 *CookSmart Recommendation*

📍 City: ${formData.city}
👥 Household: ${formData.householdSize} members
💰 Budget: ₹${formData.monthlyBudget.toLocaleString()}/month

🏆 *Best Option: ${best.name}*
💵 Monthly Cost: ₹${best.monthlyCost.toLocaleString()}
🔧 Setup Cost: ₹${best.setupCost.toLocaleString()}
⭐ Score: ${best.score}/10

🌱 Carbon Savings: ${50 - best.carbonFootprint} kg CO₂/month
💰 Subsidy Available: ₹${best.subsidyAmount.toLocaleString()}

Find your ideal cooking alternative at CookSmart! 🔗`

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    
    toast.success('Opening WhatsApp...', {
      description: 'Share your results with friends and family!',
    })
  }, [recommendations, formData])

  const handleDeleteHistory = (id: string) => {
    setSavedRecommendations(prev => prev.filter(r => r.id !== id))
    toast.success('Recommendation deleted')
  }

  const handleClearHistory = () => {
    setSavedRecommendations([])
    localStorage.removeItem('cooksmart-history')
    toast.success('History cleared')
  }

  return (
    <main className="min-h-screen">
      {/* User Account Button */}
      <UserAccountSection 
        savedRecommendations={savedRecommendations}
        onDelete={handleDeleteHistory}
        onClear={handleClearHistory}
      />

      {/* Registration Modal */}
      <RegisterModal
        open={modalOpen}
        defaultRole={modalRole}
        onClose={() => setModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
      
      {/* Hero Section */}
      <HeroSection
        onGetStarted={scrollToForm}
        onRegisterConsumer={openConsumerModal}
        onRegisterSeller={openSellerModal}
      />
      
      {/* Form Section */}
      <div ref={formRef}>
        <RecommendationForm 
          onSubmit={handleFormSubmit} 
          isLoading={isLoading}
        />
      </div>
      
      {/* Results Section - Only show when we have recommendations */}
      {recommendations.length > 0 && formData && (
        <div className="bg-background pb-20">
          <div ref={resultsRef}>
            <ResultsSection 
              recommendations={recommendations} 
              formData={formData}
              onShare={handleWhatsAppShare}
            />
          </div>
          
          <div className="container mx-auto max-w-6xl px-4 relative z-10 space-y-12">
            
            {/* Smart Insights Component */}
            <SmartInsights bestOption={recommendations[0]} />

            {/* Calculators Row */}
            <div className="grid md:grid-cols-2 gap-8">
              <CarbonCalculator 
                recommendations={recommendations} 
                householdSize={formData.householdSize}
              />
              <EMICalculator recommendations={recommendations} />
            </div>

            {/* Comparison Full Width */}
            <div className="w-full">
              <ComparisonChart recommendations={recommendations} />
            </div>
            
            {/* Extended Features Row */}
            <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-white/5 mt-10">
              <DealerLocator city={formData.city} />
              <GovernmentSchemes city={formData.city} />
              <CommunityReviews city={formData.city} />
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
