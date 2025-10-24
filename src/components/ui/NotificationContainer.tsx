import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import type { Notification, NotificationType } from '../../hooks/useNotification'

interface NotificationContainerProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
}

const notificationStyles: Record<NotificationType, { bgColor: string; borderColor: string; textColor: string; icon: typeof CheckCircle }> = {
  success: {
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    icon: CheckCircle
  },
  error: {
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    icon: AlertCircle
  },
  warning: {
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    icon: AlertTriangle
  },
  info: {
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    icon: Info
  }
}

export function NotificationContainer({ notifications, onDismiss }: NotificationContainerProps) {
  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notification) => {
        const style = notificationStyles[notification.type]
        const Icon = style.icon

        return (
          <div
            key={notification.id}
            className={`${style.bgColor} ${style.borderColor} border-l-4 rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in`}
          >
            <Icon className={`h-5 w-5 ${style.textColor} flex-shrink-0 mt-0.5`} />
            <p className={`${style.textColor} flex-1 text-sm font-medium`}>
              {notification.message}
            </p>
            <button
              onClick={() => onDismiss(notification.id)}
              className={`${style.textColor} hover:opacity-70 transition-opacity flex-shrink-0`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
