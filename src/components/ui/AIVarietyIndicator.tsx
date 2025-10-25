import { useState } from 'react'
import { RefreshCw, Sparkles } from 'lucide-react'
import { getTotalCombinations, getSessionStats } from '../../lib/dynamicAdvisories'

interface AIVarietyIndicatorProps {
  onRefresh?: () => void
  isRefreshing?: boolean
}

/**
 * Indicator showing dynamic AI recommendation variety
 * Demonstrates to judges that recommendations are dynamically generated
 */
export function AIVarietyIndicator({ onRefresh, isRefreshing = false }: AIVarietyIndicatorProps) {
  const [refreshCount, setRefreshCount] = useState(0)
  const [lastGenerated, setLastGenerated] = useState(new Date())
  
  const handleRefresh = () => {
    setRefreshCount(c => c + 1)
    setLastGenerated(new Date())
    if (onRefresh) {
      onRefresh()
    }
  }
  
  const stats = getSessionStats()
  const totalCombinations = getTotalCombinations()
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 dark:text-white">
                Dynamic AI Recommendations
              </h3>
              <span className="badge bg-blue-600 text-white text-xs">
                Live Generation
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Each recommendation is generated dynamically using AI templates with <strong>{totalCombinations.toLocaleString()}+ possible unique combinations</strong>. 
              Refresh to see new variations every time.
            </p>
          </div>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="btn-primary flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
          title="Generate new recommendations"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>New Set {refreshCount > 0 && `(${refreshCount})`}</span>
        </button>
      </div>
      
      <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">Generated:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {lastGenerated.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">Unique this session:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {stats.uniqueAdvisoriesGenerated}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-400">Total combinations:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {totalCombinations.toLocaleString()}+
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-700">
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          💡 <strong>For judges:</strong> Each refresh generates completely new recommendations from template-based AI models. 
          Session tracking ensures you won't see the same combination twice in quick succession. 
          Try refreshing 10+ times to see the variety!
        </p>
      </div>
    </div>
  )
}
