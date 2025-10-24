import type { WeatherAlertSeverity } from '../types'

type SeverityStyle = {
  badge: string
  subtle: string
  borderAccent: string
  icon: string
  text: string
}

export const weatherSeverityStyles: Record<WeatherAlertSeverity, SeverityStyle> = {
  info: {
    badge: 'bg-sky-100 text-sky-800',
    subtle: 'bg-sky-50 border border-sky-200',
    borderAccent: 'border-sky-400',
    icon: 'text-sky-600',
    text: 'text-sky-900'
  },
  watch: {
    badge: 'bg-amber-100 text-amber-800',
    subtle: 'bg-amber-50 border border-amber-200',
    borderAccent: 'border-amber-500',
    icon: 'text-amber-600',
    text: 'text-amber-900'
  },
  warning: {
    badge: 'bg-red-100 text-red-800',
    subtle: 'bg-red-50 border border-red-200',
    borderAccent: 'border-red-500',
    icon: 'text-red-600',
    text: 'text-red-900'
  }
}

export const formatForecastHour = (timestamp: string) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}

export const formatRelativeTime = (timestamp: string) => {
  const target = new Date(timestamp)
  const now = new Date()
  const diff = Math.max(0, now.getTime() - target.getTime())
  const minutes = Math.round(diff / 60000)

  if (minutes < 1) {
    return 'just now'
  }

  if (minutes < 60) {
    return `${minutes} min ago`
  }

  const hours = Math.round(minutes / 60)

  if (hours < 24) {
    return `${hours} hr${hours > 1 ? 's' : ''} ago`
  }

  const days = Math.round(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}
