"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PWAProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Register service worker
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("User accepted the install prompt")
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  return (
    <>
      {children}

      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card border rounded-lg p-4 shadow-lg z-50"
          >
            <div className="flex items-start gap-3">
              <Download className="text-primary mt-1" size={20} />
              <div className="flex-1">
                <h4 className="font-medium mb-1">Install Portfolio App</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Install this portfolio as an app for quick access and offline viewing.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleInstallClick}>
                    Install
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowInstallPrompt(false)}>
                    Maybe Later
                  </Button>
                </div>
              </div>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
