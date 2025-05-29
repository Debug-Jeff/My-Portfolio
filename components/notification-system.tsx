"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "error" | "info" | "warning"
  title: string
  message: string
  duration?: number
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }
    setNotifications((prev) => [...prev, newNotification])

    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  useEffect(() => {
    // Global notification function
    ;(window as any).showNotification = addNotification

    // Example notifications on load
    setTimeout(() => {
      addNotification({
        type: "info",
        title: "Welcome!",
        message: "Press Cmd+K to open the command palette",
        duration: 8000,
      })
    }, 3000)

    return () => {
      delete (window as any).showNotification
    }
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />
      case "error":
        return <AlertCircle className="text-red-500" size={20} />
      case "warning":
        return <AlertTriangle className="text-yellow-500" size={20} />
      default:
        return <Info className="text-blue-500" size={20} />
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="notification max-w-sm p-4 flex items-start gap-3"
          >
            {getIcon(notification.type)}
            <div className="flex-1">
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
