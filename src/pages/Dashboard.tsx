import { Link } from 'react-router-dom'
import {
  Sprout,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ArrowRight,
  CloudSun,
  Droplet,
  Wind,
  RefreshCcw,
  Thermometer,
  CloudRain,
  Handshake
} from 'lucide-react'
import { mockSeasonalAdvisories, mockPestPredictions, mockCropRecommendations } from '../data/mockData'
import { mockMarketplaceLots } from '../data/marketplaceData'
import { useWeatherData } from '../hooks/useWeatherData'
import { formatForecastHour, formatRelativeTime, weatherSeverityStyles } from '../utils/weatherStyles'

function Dashboard() {
  const { data: weatherData, loading: weatherLoading, isFallback: weatherFallback, error: weatherError, refetch: refetchWeather } = useWeatherData()
  const forecastPreview = weatherData?.forecast.slice(0, 4) ?? []
  const alertPreview = weatherData?.alerts.slice(0, 3) ?? []
  const highPriorityAdvisories = mockSeasonalAdvisories.filter(a => a.priority === 'high').length
  const highRiskPests = mockPestPredictions.filter(p => p.riskLevel === 'high').length
  const topRecommendation = mockCropRecommendations[0]
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
  const activeMarketplaceLots = mockMarketplaceLots.filter((lot) => lot.status !== 'fulfilled')
  const marketplacePipelineValue = activeMarketplaceLots.reduce(
    (acc, lot) => acc + lot.bestOfferPerTon * lot.lotSizeTons,
    0
  )
  const leadMarketplaceLot = activeMarketplaceLots
    .slice()
    .sort((a, b) => b.engagementScore - a.engagementScore)[0]
  const marketplaceLotsInPlay = activeMarketplaceLots.length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome to AgriAdvisory</h1>
        <p className="mt-2 text-gray-600">Your intelligent farming companion for better decisions</p>
      </div>

      <div className="card bg-gradient-to-br from-sky-50 to-blue-100 border-sky-200">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-sky-700 uppercase tracking-wide">Weather overview</p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-sky-900">
                {weatherLoading || !weatherData ? '--' : `${weatherData.current.temperature}°C`}
              </span>
              <span className="text-sky-800 capitalize text-base">
                {weatherLoading || !weatherData ? 'Loading forecast...' : weatherData.current.description}
              </span>
            </div>
            <p className="mt-1 text-sm text-sky-800">
              {weatherData?.location ?? 'Detecting location...'}
            </p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/80 border border-sky-100 rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
                  <Thermometer className="h-4 w-4" />
                  <span>Feels like</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {weatherLoading || !weatherData ? '--' : `${weatherData.current.feelsLike}°C`}
                </p>
              </div>
              <div className="bg-white/80 border border-sky-100 rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
                  <Droplet className="h-4 w-4" />
                  <span>Humidity</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {weatherLoading || !weatherData ? '--' : `${weatherData.current.humidity}%`}
                </p>
              </div>
              <div className="bg-white/80 border border-sky-100 rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
                  <Wind className="h-4 w-4" />
                  <span>Wind</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {weatherLoading || !weatherData ? '--' : `${weatherData.current.windSpeed} km/h`}
                </p>
              </div>
              <div className="bg-white/80 border border-sky-100 rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
                  <CloudRain className="h-4 w-4" />
                  <span>Rain chance</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-gray-900">
                  {weatherLoading || !weatherData ? '--' : `${weatherData.current.precipitationChance}%`}
                </p>
              </div>
            </div>
            {weatherFallback && (
              <p className="mt-3 text-xs font-medium text-sky-700">
                Showing simulated data while live weather updates are unavailable.
              </p>
            )}
            {weatherError && (
              <p className="mt-2 text-xs text-red-600">
                {weatherError}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-3 text-right min-w-[150px]">
            <CloudSun className="h-12 w-12 text-sky-500" />
            <button
              type="button"
              onClick={refetchWeather}
              className="inline-flex items-center gap-1 text-xs font-medium text-sky-700 hover:text-sky-900 transition-colors"
            >
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </button>
            <p className="text-xs text-sky-700">
              {weatherData ? `Updated ${formatRelativeTime(weatherData.lastUpdated)}` : 'Awaiting update'}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Upcoming forecast</p>
          {forecastPreview.length === 0 ? (
            <p className="mt-2 text-sm text-sky-800">Forecast data is not available right now.</p>
          ) : (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              {forecastPreview.map((entry) => (
                <div key={entry.timestamp} className="bg-white/80 border border-sky-100 rounded-lg p-3 shadow-sm">
                  <p className="text-xs text-sky-700 font-semibold">{formatForecastHour(entry.timestamp)}</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{entry.temperature}°C</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Droplet className="h-4 w-4 text-sky-600" />
                      {entry.precipitationChance}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="h-4 w-4 text-sky-600" />
                      {entry.windSpeed} km/h
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 capitalize leading-snug">{entry.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {alertPreview.length > 0 && (
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Weather alerts</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {alertPreview.map((alert) => {
                const badgeClass = weatherSeverityStyles[alert.severity]?.badge ?? 'bg-gray-100 text-gray-800'
                return (
                  <span key={alert.id} className={`badge ${badgeClass}`}>
                    {`${alert.severity.toUpperCase()} • ${alert.title}`}
                  </span>
                )
              })}
            </div>
          </div>
        )}
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

      <div className="card bg-gradient-to-r from-emerald-50 via-teal-50 to-primary-50 border-emerald-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Handshake className="h-5 w-5 mr-2 text-emerald-600" />
              Marketplace pipeline
            </h2>
            <p className="text-gray-600 mt-2">
              {marketplaceLotsInPlay > 0
                ? `${marketplaceLotsInPlay} active lots tracking ${formatCurrency(marketplacePipelineValue)} in demand-aligned value.`
                : 'All lots fulfilled—open the marketplace to activate new opportunities.'}
            </p>
            {leadMarketplaceLot && (
              <p className="text-sm text-emerald-700 mt-3">
                Spotlight: {leadMarketplaceLot.crop} from {leadMarketplaceLot.location} at {leadMarketplaceLot.engagementScore}% buyer engagement.
              </p>
            )}
          </div>
          <Link
            to="/marketplace"
            className="btn-primary flex items-center justify-center w-full md:w-auto"
          >
            Open Marketplace
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
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
