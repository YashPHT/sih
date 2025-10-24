import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cropPriceHistories } from '../data/priceHistoryData'
import { generatePriceForecast, calculateMarketInsights } from '../utils/forecasting'

interface PriceForecastChartProps {
  cropName: string
}

function PriceForecastChart({ cropName }: PriceForecastChartProps) {
  const cropData = cropPriceHistories.find(c => c.crop === cropName)
  
  if (!cropData) {
    return <div className="text-gray-500">No data available for {cropName}</div>
  }
  
  const forecast = generatePriceForecast(cropData.history, 6)
  const insights = calculateMarketInsights(cropData.history)
  
  // Combine historical and forecast data for visualization
  const chartData: Array<{
    date: string
    actualPrice: number | null
    predictedPrice: number | null
    upperBound: number | null
    lowerBound: number | null
    type: string
  }> = [
    ...cropData.history.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      actualPrice: entry.price as number | null,
      predictedPrice: null as number | null,
      upperBound: null as number | null,
      lowerBound: null as number | null,
      type: 'historical'
    })),
    ...forecast.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      actualPrice: null as number | null,
      predictedPrice: entry.predictedPrice as number | null,
      upperBound: entry.confidenceInterval.upper as number | null,
      lowerBound: entry.confidenceInterval.lower as number | null,
      type: 'forecast'
    }))
  ]
  
  // Connect the last historical point to the first forecast point
  const lastHistorical = cropData.history[cropData.history.length - 1]
  chartData[cropData.history.length - 1] = {
    date: chartData[cropData.history.length - 1].date,
    actualPrice: lastHistorical.price as number | null,
    predictedPrice: lastHistorical.price as number | null,
    upperBound: null as number | null,
    lowerBound: null as number | null,
    type: 'historical'
  }
  
  const trendIcon = insights.trend.direction === 'upward' 
    ? TrendingUp 
    : insights.trend.direction === 'downward'
    ? TrendingDown
    : Minus
    
  const TrendIcon = trendIcon
  const trendColor = insights.trend.direction === 'upward' 
    ? 'text-green-600' 
    : insights.trend.direction === 'downward'
    ? 'text-red-600'
    : 'text-gray-600'
  
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{cropName} Price Forecast</h3>
          <p className="text-sm text-gray-500">
            Historical data and 6-month AI-powered forecast
          </p>
        </div>
        <div className="text-right">
          <div className={`flex items-center gap-2 ${trendColor}`}>
            <TrendIcon className="h-5 w-5" />
            <span className="font-semibold capitalize">{insights.trend.direction} Trend</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Volatility: {insights.volatilityLevel}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-700 font-medium">Avg Price</p>
          <p className="text-xl font-bold text-blue-900 mt-1">
            ₹{insights.averagePrice}
          </p>
          <p className="text-xs text-blue-600 mt-1">{cropData.unit}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-700 font-medium">Min Price</p>
          <p className="text-xl font-bold text-green-900 mt-1">
            ₹{insights.priceRange.min}
          </p>
          <p className="text-xs text-green-600 mt-1">Last 12 months</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-red-700 font-medium">Max Price</p>
          <p className="text-xl font-bold text-red-900 mt-1">
            ₹{insights.priceRange.max}
          </p>
          <p className="text-xs text-red-600 mt-1">Last 12 months</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <p className="text-xs text-purple-700 font-medium">Volatility</p>
          <p className="text-xl font-bold text-purple-900 mt-1">
            {insights.volatility.toFixed(1)}%
          </p>
          <p className="text-xs text-purple-600 mt-1 capitalize">{insights.volatilityLevel}</p>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              style={{ fontSize: '12px' }}
              stroke="#6b7280"
            />
            <YAxis 
              style={{ fontSize: '12px' }}
              stroke="#6b7280"
              label={{ value: `Price (${cropData.currency})`, angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => {
                if (value === null || value === undefined) return ['', '']
                return [`₹${value}`, '']
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            <Area
              type="monotone"
              dataKey="upperBound"
              fill="#dbeafe"
              stroke="none"
              fillOpacity={0.3}
              name="Confidence Interval"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              fill="#dbeafe"
              stroke="none"
              fillOpacity={0.3}
            />
            <Line 
              type="monotone" 
              dataKey="actualPrice" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Actual Price"
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="predictedPrice" 
              stroke="#f59e0b" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: '#f59e0b' }}
              name="Forecasted Price"
              connectNulls={true}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-600 text-white rounded-lg p-2">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">AI Recommendation</h4>
            <p className="text-sm text-gray-700 mt-1">{insights.recommendation}</p>
            <p className="text-xs text-gray-500 mt-2">
              {insights.trend.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceForecastChart
