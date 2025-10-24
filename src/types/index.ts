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

export type StakeholderRole = 'farmer' | 'fpo' | 'processor' | 'retailer'

export type TrendDirection = 'positive' | 'negative' | 'neutral'

export type ImpactLevel = 'high' | 'medium' | 'low'

export interface StakeholderKPI {
  id: string
  label: string
  value: string
  change: string
  trend: TrendDirection
}

export interface StakeholderAction {
  id: string
  title: string
  description: string
  dueDate: string
  impact: ImpactLevel
  owner: string
}

export type CommunicationStatus = 'awaiting-response' | 'scheduled' | 'resolved'

export interface StakeholderCommunication {
  id: string
  counterpart: string
  topic: string
  lastMessage: string
  lastUpdated: string
  status: CommunicationStatus
}

export type OpportunityStatus = 'negotiation' | 'matched' | 'new'

export interface StakeholderOpportunity {
  id: string
  buyer: string
  requirement: string
  value: string
  timeline: string
  status: OpportunityStatus
}

export type LogisticsStatus = 'in-transit' | 'scheduled' | 'delayed' | 'delivered'

export interface StakeholderLogistics {
  id: string
  route: string
  status: LogisticsStatus
  eta: string
  mode: string
  progress: number
}

export interface StakeholderHighlight {
  title: string
  subtitle: string
  context: string
}

export interface StakeholderDashboardData {
  highlight: StakeholderHighlight
  kpis: StakeholderKPI[]
  actions: StakeholderAction[]
  communications: StakeholderCommunication[]
  opportunities: StakeholderOpportunity[]
  logistics: StakeholderLogistics[]
}
