import { Link } from 'react-router-dom'
import { Sprout, TrendingUp, AlertTriangle, Calendar, ArrowRight } from 'lucide-react'
import { mockSeasonalAdvisories, mockPestPredictions, mockCropRecommendations } from '../data/mockData'

function Dashboard() {
  const highPriorityAdvisories = mockSeasonalAdvisories.filter(a => a.priority === 'high').length
  const highRiskPests = mockPestPredictions.filter(p => p.riskLevel === 'high').length
  const topRecommendation = mockCropRecommendations[0]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome to AgriAdvisory</h1>
        <p className="mt-2 text-gray-600">Your intelligent farming companion for better decisions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Crop Recommendations</p>
              <p className="text-3xl font-bold text-green-900 mt-2">{mockCropRecommendations.length}</p>
              <p className="text-sm text-green-700 mt-1">Available for this season</p>
            </div>
            <Sprout className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800">Active Alerts</p>
              <p className="text-3xl font-bold text-amber-900 mt-2">{highPriorityAdvisories}</p>
              <p className="text-sm text-amber-700 mt-1">High priority actions</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-amber-600" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Pest Risks</p>
              <p className="text-3xl font-bold text-red-900 mt-2">{highRiskPests}</p>
              <p className="text-sm text-red-700 mt-1">High risk detected</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Sprout className="h-5 w-5 mr-2 text-primary-600" />
              Top Crop Recommendation
            </h2>
            <Link to="/crop-advisory" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="bg-gradient-to-r from-primary-50 to-green-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-900">{topRecommendation.cropName}</h3>
              <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {topRecommendation.suitabilityScore}% Match
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Expected Yield</p>
                <p className="font-semibold text-gray-900">{topRecommendation.estimatedYield}</p>
              </div>
              <div>
                <p className="text-gray-600">Profit Potential</p>
                <p className="font-semibold text-gray-900">{topRecommendation.profitPotential}</p>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-gray-600 text-sm">Season</p>
              <p className="font-semibold text-gray-900">{topRecommendation.season}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary-600" />
              Upcoming Actions
            </h2>
            <Link to="/crop-advisory" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {mockSeasonalAdvisories.slice(0, 3).map((advisory) => (
              <div
                key={advisory.id}
                className="p-3 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`badge ${
                          advisory.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : advisory.priority === 'medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {advisory.priority}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{advisory.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{new Date(advisory.actionDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              Credit & Insurance Services
            </h2>
            <p className="text-gray-600 mt-2">Access financial services to support your farming operations</p>
            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-600">Credit Score</p>
                <p className="text-2xl font-bold text-gray-900">745</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Max Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900">₹5,00,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Interest Rate</p>
                <p className="text-2xl font-bold text-gray-900">7.5%</p>
              </div>
            </div>
          </div>
          <Link
            to="/credit-insurance"
            className="btn-primary flex items-center"
          >
            Explore Options
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
