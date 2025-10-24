import { useState } from 'react'
import { Sprout, TrendingUp, Droplet, DollarSign, AlertTriangle, Calendar, CheckCircle, Clock } from 'lucide-react'
import { mockCropRecommendations, mockSeasonalAdvisories, mockPestPredictions } from '../data/mockData'
import { CropRecommendation, SeasonalAdvisory, PestPrediction } from '../types'

function CropRecommendationCard({ crop }: { crop: CropRecommendation }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{crop.cropName}</h3>
        <div className="flex items-center">
          <div className="relative w-16 h-16">
            <svg className="transform -rotate-90 w-16 h-16">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - crop.suitabilityScore / 100)}`}
                className="text-primary-600"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-900">{crop.suitabilityScore}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm">
          <TrendingUp className="h-4 w-4 mr-2 text-primary-600" />
          <span className="text-gray-600">Estimated Yield:</span>
          <span className="ml-auto font-semibold text-gray-900">{crop.estimatedYield}</span>
        </div>
        <div className="flex items-center text-sm">
          <Droplet className="h-4 w-4 mr-2 text-blue-600" />
          <span className="text-gray-600">Water Requirement:</span>
          <span className="ml-auto font-semibold text-gray-900">{crop.waterRequirement}</span>
        </div>
        <div className="flex items-center text-sm">
          <DollarSign className="h-4 w-4 mr-2 text-green-600" />
          <span className="text-gray-600">Profit Potential:</span>
          <span className="ml-auto font-semibold text-gray-900">{crop.profitPotential}</span>
        </div>
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-amber-600" />
          <span className="text-gray-600">Season:</span>
          <span className="ml-auto font-semibold text-gray-900">{crop.season}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">Why this crop is recommended:</p>
        <ul className="space-y-1">
          {crop.reasons.map((reason, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="btn-primary w-full mt-4">
        Select This Crop
      </button>
    </div>
  )
}

function SeasonalAdvisoryCard({ advisory }: { advisory: SeasonalAdvisory }) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'irrigation':
        return <Droplet className="h-5 w-5" />
      case 'fertilization':
        return <Sprout className="h-5 w-5" />
      case 'pest-control':
        return <AlertTriangle className="h-5 w-5" />
      case 'weather':
        return <AlertTriangle className="h-5 w-5" />
      case 'harvest':
        return <Calendar className="h-5 w-5" />
      default:
        return <Calendar className="h-5 w-5" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-amber-600" />
    }
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            advisory.category === 'irrigation' ? 'bg-blue-100 text-blue-600' :
            advisory.category === 'fertilization' ? 'bg-green-100 text-green-600' :
            advisory.category === 'pest-control' ? 'bg-red-100 text-red-600' :
            advisory.category === 'weather' ? 'bg-amber-100 text-amber-600' :
            'bg-gray-100 text-gray-600'
          }`}>
            {getCategoryIcon(advisory.category)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{advisory.title}</h3>
            <p className="text-sm text-gray-600">{new Date(advisory.actionDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`badge ${
            advisory.priority === 'high' ? 'bg-red-100 text-red-800' :
            advisory.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {advisory.priority}
          </span>
          {getStatusIcon(advisory.status)}
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{advisory.description}</p>
      <button className="btn-secondary w-full mt-4">
        Mark as {advisory.status === 'pending' ? 'In Progress' : 'Completed'}
      </button>
    </div>
  )
}

function PestPredictionCard({ pest }: { pest: PestPrediction }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{pest.pestName}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`badge ${
              pest.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
              pest.riskLevel === 'medium' ? 'bg-amber-100 text-amber-800' :
              'bg-green-100 text-green-800'
            }`}>
              {pest.riskLevel.toUpperCase()} RISK
            </span>
            <span className="text-sm text-gray-600">
              {pest.probability}% probability
            </span>
          </div>
        </div>
        <div className="text-center">
          <div className="relative w-20 h-20">
            <svg className="transform -rotate-90 w-20 h-20">
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="40"
                cy="40"
                r="35"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 35}`}
                strokeDashoffset={`${2 * Math.PI * 35 * (1 - pest.probability / 100)}`}
                className={
                  pest.riskLevel === 'high' ? 'text-red-600' :
                  pest.riskLevel === 'medium' ? 'text-amber-600' :
                  'text-green-600'
                }
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900">{pest.probability}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">Affected Crops:</p>
        <div className="flex flex-wrap gap-2">
          {pest.affectedCrops.map((crop, index) => (
            <span key={index} className="badge bg-primary-100 text-primary-800">
              {crop}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
        <p className="text-sm font-semibold text-amber-900">Estimated Impact:</p>
        <p className="text-sm text-amber-800 mt-1">{pest.estimatedImpact}</p>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="btn-secondary w-full"
      >
        {showDetails ? 'Hide Details' : 'View Prevention & Symptoms'}
      </button>

      {showDetails && (
        <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">Preventive Measures:</p>
            <ul className="space-y-1">
              {pest.preventiveMeasures.map((measure, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>{measure}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-2">Early Symptoms:</p>
            <ul className="space-y-1">
              {pest.earlySymptoms.map((symptom, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-amber-600 mr-2">⚠</span>
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

function CropAdvisory() {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'advisories' | 'pest'>('recommendations')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Sprout className="h-8 w-8 mr-3 text-primary-600" />
          Crop Advisory
        </h1>
        <p className="mt-2 text-gray-600">AI-powered insights for optimal crop planning and management</p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'recommendations'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Crop Recommendations
        </button>
        <button
          onClick={() => setActiveTab('advisories')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'advisories'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Seasonal Advisories
        </button>
        <button
          onClick={() => setActiveTab('pest')}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === 'pest'
              ? 'border-primary-600 text-primary-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Pest Predictions
        </button>
      </div>

      {activeTab === 'recommendations' && (
        <div>
          <div className="mb-6 card bg-blue-50 border-blue-200">
            <h2 className="font-bold text-gray-900 mb-2">🤖 AI Insights</h2>
            <p className="text-sm text-gray-700">
              Based on your soil analysis, weather patterns, historical data, and market trends, we've identified the best crops for your farm this season. These recommendations are personalized using machine learning models trained on regional agricultural data.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockCropRecommendations.map((crop) => (
              <CropRecommendationCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'advisories' && (
        <div>
          <div className="mb-6 card bg-blue-50 border-blue-200">
            <h2 className="font-bold text-gray-900 mb-2">📅 Seasonal Action Plan</h2>
            <p className="text-sm text-gray-700">
              Stay on top of critical farming activities with timely advisories. Our AI analyzes weather forecasts, crop growth stages, and best practices to give you actionable recommendations.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockSeasonalAdvisories.map((advisory) => (
              <SeasonalAdvisoryCard key={advisory.id} advisory={advisory} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pest' && (
        <div>
          <div className="mb-6 card bg-blue-50 border-blue-200">
            <h2 className="font-bold text-gray-900 mb-2">🐛 Predictive Pest Management</h2>
            <p className="text-sm text-gray-700">
              Our AI model analyzes weather conditions, historical pest patterns, and regional data to predict potential pest outbreaks. Take preventive action before infestations occur.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockPestPredictions.map((pest) => (
              <PestPredictionCard key={pest.id} pest={pest} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CropAdvisory
