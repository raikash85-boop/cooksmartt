import type { CookingOption, UserFormData, EMIDetails, City } from './types'
import { CITY_PRICE_MULTIPLIERS, FREQUENCY_MULTIPLIERS } from './types'

export function calculateRecommendations(formData: UserFormData): CookingOption[] {
  const { householdSize, monthlyBudget, city, cookingFrequency } = formData
  
  const cityMultiplier = CITY_PRICE_MULTIPLIERS[city as City] || 1.0
  const frequencyMultiplier = FREQUENCY_MULTIPLIERS[cookingFrequency] || 1.0
  
  const options: CookingOption[] = []
  
  // Electric Induction
  const inductionMonthlyCost = Math.round(householdSize * 400 * cityMultiplier * frequencyMultiplier)
  const inductionSetupCost = Math.round(3000 * cityMultiplier)
  
  if (monthlyBudget >= inductionMonthlyCost) {
    options.push({
      id: 'induction',
      name: 'Electric Induction',
      icon: '⚡',
      monthlyCost: inductionMonthlyCost,
      setupCost: inductionSetupCost,
      score: 8,
      pros: [
        'Fast and efficient cooking',
        'Precise temperature control',
        'Safe - no open flame',
        'Easy to clean',
        'Works in all weather',
      ],
      cons: [
        'Requires compatible cookware',
        'Dependent on electricity',
        'Higher electricity bills',
      ],
      carbonFootprint: Math.round(householdSize * 15 * frequencyMultiplier), // kg CO2/month
      subsidyAmount: Math.round(500 * cityMultiplier),
      subsidyScheme: 'Delhi Clean Energy Incentive',
      color: 'from-amber-400 to-orange-500',
    })
  }
  
  // Biogas
  const biogasMonthlyCost = Math.round(householdSize * 300 * cityMultiplier * frequencyMultiplier)
  const biogasSetupCost = Math.round(15000 * cityMultiplier)
  
  if (monthlyBudget >= biogasMonthlyCost) {
    options.push({
      id: 'biogas',
      name: 'Biogas Plant',
      icon: '🌿',
      monthlyCost: biogasMonthlyCost,
      setupCost: biogasSetupCost,
      score: 9,
      pros: [
        'Very low running cost',
        'Eco-friendly - uses organic waste',
        'Produces free fertilizer',
        'Government subsidies available',
        'Independent of fuel prices',
      ],
      cons: [
        'High initial setup cost',
        'Requires space for plant',
        'Needs regular organic waste supply',
        'Initial learning curve',
      ],
      carbonFootprint: Math.round(householdSize * 5 * frequencyMultiplier), // kg CO2/month
      subsidyAmount: Math.round(10000 * cityMultiplier),
      subsidyScheme: 'National Biogas Programme (NBMMP)',
      color: 'from-emerald-400 to-teal-500',
    })
  }
  
  // Solar Cooker - Always show (cheapest option)
  const solarMonthlyCost = Math.round(100 * cityMultiplier * frequencyMultiplier)
  const solarSetupCost = Math.round(5000 * cityMultiplier)
  
  options.push({
    id: 'solar',
    name: 'Solar Cooker',
    icon: '☀️',
    monthlyCost: solarMonthlyCost,
    setupCost: solarSetupCost,
    score: 7,
    pros: [
      'Lowest running cost',
      'Zero fuel dependency',
      'Completely eco-friendly',
      'No electricity needed',
      'Healthy slow cooking',
    ],
    cons: [
      'Weather dependent',
      'Limited cooking times',
      'Slow cooking process',
      'Not suitable for all dishes',
      'Needs backup option',
    ],
    carbonFootprint: 0, // Zero emissions
    subsidyAmount: Math.round(2000 * cityMultiplier),
    subsidyScheme: 'State Solar Cooker Subsidy',
    color: 'from-yellow-400 to-amber-500',
  })
  
  // Sort by score (highest first)
  return options.sort((a, b) => b.score - a.score)
}

export function calculateSavings(monthlyCost: number, lpgCost: number = 1200): number {
  return (lpgCost - monthlyCost) * 12 // Annual savings
}

export function calculateEMI(principal: number, interestRate: number = 12, tenure: number = 12): EMIDetails {
  const monthlyRate = interestRate / 12 / 100
  
  if (monthlyRate === 0) {
    return {
      principal,
      interestRate,
      tenure,
      emi: Math.round(principal / tenure),
      totalAmount: principal,
      totalInterest: 0,
    }
  }
  
  const emi = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1)
  )
  
  const totalAmount = emi * tenure
  const totalInterest = totalAmount - principal
  
  return {
    principal,
    interestRate,
    tenure,
    emi,
    totalAmount,
    totalInterest,
  }
}

export function calculateCarbonSavings(currentFootprint: number, lpgFootprint: number = 50): number {
  // Returns kg CO2 saved per month compared to LPG
  return lpgFootprint - currentFootprint
}

export function getScoreColor(score: number): string {
  if (score >= 9) return 'text-emerald-500'
  if (score >= 8) return 'text-green-500'
  if (score >= 7) return 'text-yellow-500'
  return 'text-orange-500'
}

export function getScoreLabel(score: number): string {
  if (score >= 9) return 'Excellent'
  if (score >= 8) return 'Very Good'
  if (score >= 7) return 'Good'
  return 'Fair'
}
