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

export type MarketLotStatus = 'available' | 'in-negotiation' | 'under-fulfillment' | 'fulfilled'

export interface MarketplaceBuyerInterest {
  id: string
  buyerName: string
  organization: string
  offerPerTon: number
  volumeTons: number
  status: 'active' | 'counter' | 'accepted'
  updatedAt: string
}

export interface MarketplaceLogisticsOption {
  id: string
  provider: string
  mode: string
  estimatedCost: string
  transitTime: string
  availability: string
  capacity: string
  reliabilityScore: number
}

export interface MarketplaceCreditOption {
  id: string
  provider: string
  product: string
  rate: string
  maxAmount: string
  approvalTime: string
  notes: string
}

export interface MarketplaceLot {
  id: string
  crop: string
  variety: string
  lotSizeTons: number
  qualityGrade: string
  moisture: string
  location: string
  harvestDate: string
  status: MarketLotStatus
  askingPricePerTon: number
  bestOfferPerTon: number
  contractCurrency: string
  engagementScore: number
  activeOffers: number
  assuranceNotes: string[]
  buyerInterest: MarketplaceBuyerInterest[]
  logisticsOptions: MarketplaceLogisticsOption[]
  creditOptions: MarketplaceCreditOption[]
}

export type WeatherAlertSeverity = 'info' | 'watch' | 'warning'

export type WeatherAlertCategory = 'crop' | 'logistics' | 'general'

export interface WeatherCurrent {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  precipitationChance: number
  description: string
  icon: string
}

export interface WeatherForecastEntry {
  timestamp: string
  temperature: number
  precipitationChance: number
  windSpeed: number
  description: string
  icon: string
}

export interface WeatherAlert {
  id: string
  title: string
  severity: WeatherAlertSeverity
  category: WeatherAlertCategory
  description: string
  impactAreas: string[]
  recommendedActions: string[]
}

export interface WeatherApiResponse {
  location: string
  source: 'live' | 'mock'
  lastUpdated: string
  current: WeatherCurrent
  forecast: WeatherForecastEntry[]
  alerts: WeatherAlert[]
}

export type SupplyChainEventType =
  | 'planting'
  | 'growth-monitoring'
  | 'pest-treatment'
  | 'irrigation'
  | 'fertilization'
  | 'harvesting'
  | 'processing'
  | 'quality-inspection'
  | 'packaging'
  | 'distribution'
  | 'retail-delivery'

export interface SupplyChainEvent {
  id: string
  batchId: string
  eventType: SupplyChainEventType
  timestamp: string
  location: string
  actor: string
  data: Record<string, string | number | boolean>
  previousHash: string
  currentHash: string
  blockNumber: number
}

export interface TraceabilityBatch {
  id: string
  batchNumber: string
  crop: string
  quantity: string
  originFarm: string
  createdAt: string
  status: 'active' | 'completed'
  events: SupplyChainEvent[]
  isVerified: boolean
}

export interface BlockchainVerification {
  isValid: boolean
  totalBlocks: number
  invalidBlocks: number[]
  message: string
}

export interface GeoLocation {
  lat: number
  lng: number
  address: string
}

export interface GeoPoint {
  lat: number
  lng: number
}

export type WarehouseStatus = 'operational' | 'maintenance' | 'critical'

export interface Warehouse {
  id: string
  name: string
  type: 'warehouse'
  location: GeoLocation
  status: WarehouseStatus
  capacity: {
    total: number
    used: number
    available: number
  }
  commodities: string[]
  temperature: number
  lastUpdated: string
}

export type ProcessingStatus = 'operational' | 'maintenance' | 'critical'

export interface ProcessingUnit {
  id: string
  name: string
  type: 'processing'
  location: GeoLocation
  status: ProcessingStatus
  throughput: {
    current: number
    capacity: number
    efficiency: number
  }
  commodities: string[]
  activeBatches: number
  lastUpdated: string
}

export type RouteStatus = 'active' | 'delayed' | 'scheduled' | 'completed'

export interface TransportRoute {
  id: string
  name: string
  type: 'route'
  status: RouteStatus
  commodity: string
  origin: GeoPoint & { name: string }
  destination: GeoPoint & { name: string }
  waypoints: GeoPoint[]
  mode: string
  distance: number
  estimatedTime: string
  progress: number
  vehicleId: string
  lastUpdated: string
}

export interface LogisticsGeoData {
  warehouses: Warehouse[]
  processingUnits: ProcessingUnit[]
  routes: TransportRoute[]
}

export interface MapFilters {
  commodities: string[]
  statuses: string[]
  showWarehouses: boolean
  showProcessingUnits: boolean
  showRoutes: boolean
}
