export interface CropRecommendation {
  id: string
  cropName: string
  suitabilityScore: number
  estimatedYield: string
  waterRequirement: string
  profitPotential: string
  season: string
  reasons: string[]
}

export interface SeasonalAdvisory {
  id: string
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
  category: 'irrigation' | 'fertilization' | 'pest-control' | 'weather' | 'harvest'
  actionDate: string
  status: 'pending' | 'completed' | 'in-progress'
}

export interface PestPrediction {
  id: string
  pestName: string
  riskLevel: 'high' | 'medium' | 'low'
  affectedCrops: string[]
  probability: number
  preventiveMeasures: string[]
  earlySymptoms: string[]
  estimatedImpact: string
}

export interface CreditEligibility {
  isEligible: boolean
  score: number
  maxLoanAmount: number
  interestRate: number
  repaymentPeriod: number
  factors: {
    name: string
    score: number
    weight: number
  }[]
}

export interface InsurancePlan {
  id: string
  name: string
  coverage: string
  premium: number
  coverageAmount: number
  crops: string[]
  benefits: string[]
  recommended: boolean
}
