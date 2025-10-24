import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'
import { DemandSupplyData } from '../data/priceHistoryData'

interface DemandSupplyChartProps {
  data: DemandSupplyData
}

function DemandSupplyChart({ data }: DemandSupplyChartProps) {
  const chartData = data.months.map((month, index) => ({
    month,
    demand: data.demandForecast[index],
    supply: data.supplyForecast[index],
    gap: data.supplyForecast[index] - data.demandForecast[index]
  }))
  
  const balanceColor = data.marketBalance === 'surplus' 
    ? 'text-blue-600' 
    : data.marketBalance === 'deficit'
    ? 'text-red-600'
    : 'text-green-600'
    
  const balanceIcon = data.marketBalance === 'surplus'
    ? AlertCircle
    : data.marketBalance === 'deficit'
    ? AlertTriangle
    : CheckCircle
    
  const BalanceIcon = balanceIcon
  
  const demandTrendIcon = data.demandTrend === 'increasing'
    ? TrendingUp
    : data.demandTrend === 'decreasing'
    ? TrendingDown
    : Minus
    
  const supplyTrendIcon = data.supplyTrend === 'increasing'
    ? TrendingUp
    : data.supplyTrend === 'decreasing'
    ? TrendingDown
    : Minus
    
  const DemandTrendIcon = demandTrendIcon
  const SupplyTrendIcon = supplyTrendIcon
  
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{data.crop} Demand-Supply Analytics</h3>
          <p className="text-sm text-gray-500">
            6-month forecast with market balance insights
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${
          data.marketBalance === 'surplus' 
            ? 'border-blue-200 bg-blue-50' 
            : data.marketBalance === 'deficit'
            ? 'border-red-200 bg-red-50'
            : 'border-green-200 bg-green-50'
        }`}>
          <BalanceIcon className={`h-5 w-5 ${balanceColor}`} />
          <span className={`font-semibold capitalize ${balanceColor}`}>
            {data.marketBalance}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Current Demand</h4>
            <DemandTrendIcon className={`h-5 w-5 ${
              data.demandTrend === 'increasing' 
                ? 'text-red-600' 
                : data.demandTrend === 'decreasing'
                ? 'text-green-600'
                : 'text-gray-600'
            }`} />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(data.currentDemand / 1000).toFixed(1)}K MT
          </p>
          <p className={`text-sm mt-1 capitalize ${
            data.demandTrend === 'increasing' 
              ? 'text-red-600' 
              : data.demandTrend === 'decreasing'
              ? 'text-green-600'
              : 'text-gray-600'
          }`}>
            {data.demandTrend}
          </p>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Current Supply</h4>
            <SupplyTrendIcon className={`h-5 w-5 ${
              data.supplyTrend === 'increasing' 
                ? 'text-green-600' 
                : data.supplyTrend === 'decreasing'
                ? 'text-red-600'
                : 'text-gray-600'
            }`} />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(data.currentSupply / 1000).toFixed(1)}K MT
          </p>
          <p className={`text-sm mt-1 capitalize ${
            data.supplyTrend === 'increasing' 
              ? 'text-green-600' 
              : data.supplyTrend === 'decreasing'
              ? 'text-red-600'
              : 'text-gray-600'
          }`}>
            {data.supplyTrend}
          </p>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              style={{ fontSize: '12px' }}
              stroke="#6b7280"
            />
            <YAxis 
              style={{ fontSize: '12px' }}
              stroke="#6b7280"
              label={{ value: 'Quantity (MT)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number) => [`${value.toLocaleString()} MT`, '']}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Bar dataKey="demand" fill="#ef4444" name="Demand" radius={[4, 4, 0, 0]} />
            <Bar dataKey="supply" fill="#10b981" name="Supply" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`rounded-lg p-4 ${
          data.marketBalance === 'deficit' 
            ? 'bg-red-50 border border-red-200' 
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Market Gap Analysis</h4>
          <p className="text-lg font-bold text-gray-900">
            {Math.abs(data.currentSupply - data.currentDemand).toLocaleString()} MT
          </p>
          <p className={`text-sm mt-1 ${
            data.marketBalance === 'deficit' ? 'text-red-700' : 'text-blue-700'
          }`}>
            {data.marketBalance === 'deficit' 
              ? 'Supply shortage requiring immediate intervention'
              : data.marketBalance === 'surplus'
              ? 'Excess supply may lead to price depression'
              : 'Market well-balanced'
            }
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">6-Month Outlook</h4>
          <p className="text-lg font-bold text-gray-900">
            Gap {chartData[chartData.length - 1].gap > 0 ? 'Widening' : 'Narrowing'}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Expected gap in Month +5: {Math.abs(chartData[chartData.length - 1].gap).toLocaleString()} MT
          </p>
        </div>
      </div>
      
      {data.marketBalance === 'deficit' && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-red-900">Policy Intervention Recommended</h4>
              <p className="text-sm text-red-800 mt-1">
                Current deficit of {Math.abs(data.currentSupply - data.currentDemand).toLocaleString()} MT 
                requires immediate policy action. Consider production incentives, import facilitation, 
                or strategic reserve release.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {data.marketBalance === 'surplus' && (
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900">Market Stabilization Needed</h4>
              <p className="text-sm text-blue-800 mt-1">
                Surplus of {Math.abs(data.currentSupply - data.currentDemand).toLocaleString()} MT 
                may depress prices. Consider procurement support, export promotion, 
                or value-addition programs.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DemandSupplyChart
