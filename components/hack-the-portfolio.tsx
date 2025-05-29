"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Shield, Eye } from "lucide-react"

export default function HackThePortfolio() {
  const [hackingStage, setHackingStage] = useState(0)
  const [isHacking, setIsHacking] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const [hackingProgress, setHackingProgress] = useState(0)
  const [discoveredSecrets, setDiscoveredSecrets] = useState<string[]>([])

  const hackingStages = [
    "Initializing hack attempt...",
    "Scanning for vulnerabilities...",
    "Attempting SQL injection...",
    "Trying XSS attacks...",
    "Checking for CSRF tokens...",
    "Analyzing security headers...",
    "Attempting privilege escalation...",
    "Bypassing WAF...",
    "Cracking encryption...",
    "Access denied - Portfolio is secure! 🛡️",
  ]

  const secrets = [
    "🔍 Found hidden API endpoint: /api/secrets",
    "🎯 Discovered developer mode: Press Shift+Ctrl+D",
    "🌟 Secret achievement unlocked: Persistent Hacker",
    "🔐 Found encrypted message: 'V2VsY29tZSB0byB0aGUgbWF0cml4'",
    "🎮 Mini-game unlocked: Type 'play snake' in terminal",
  ]

  useEffect(() => {
    // Listen for specific key combinations
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami code for hacking mode
      if (e.code === "KeyH" && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        startHacking()
      }

      // Developer mode
      if (e.code === "KeyD" && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        toggleDeveloperMode()
      }

      // Matrix mode
      if (e.code === "KeyM" && e.altKey) {
        e.preventDefault()
        toggleMatrixMode()
      }
    }

    // Listen for specific click patterns
    let clickCount = 0
    let clickTimer: NodeJS.Timeout

    const handleClick = (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).closest(".logo")) {
        clickCount++
        clearTimeout(clickTimer)

        clickTimer = setTimeout(() => {
          if (clickCount === 10) {
            activateSecretMode()
          }
          clickCount = 0
        }, 1000)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClick)
      clearTimeout(clickTimer)
    }
  }, [])

  const startHacking = () => {
    if (isHacking) return

    setIsHacking(true)
    setHackingStage(0)
    setHackingProgress(0)

    // Show notification
    if ((window as any).showNotification) {
      ;(window as any).showNotification({
        type: "warning",
        title: "Hack Attempt Detected! 🚨",
        message: "Someone is trying to hack the portfolio...",
        duration: 5000,
      })
    }

    // Simulate hacking progress
    const interval = setInterval(() => {
      setHackingProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(interval)
          setHackingStage(hackingStages.length - 1)
          setTimeout(() => {
            setIsHacking(false)
            revealSecret()
          }, 2000)
          return 100
        }
        return newProgress
      })

      setHackingStage((prev) => {
        const newStage = Math.floor((hackingProgress / 100) * (hackingStages.length - 1))
        return Math.min(newStage, hackingStages.length - 2)
      })
    }, 500)
  }

  const toggleDeveloperMode = () => {
    document.body.classList.toggle("developer-mode")

    if ((window as any).showNotification) {
      ;(window as any).showNotification({
        type: "info",
        title: "Developer Mode Toggled! 👨‍💻",
        message: "Secret developer features are now visible",
        duration: 3000,
      })
    }

    // Add developer overlay
    const overlay = document.createElement("div")
    overlay.className = "fixed top-0 left-0 w-full h-full pointer-events-none z-40"
    overlay.innerHTML = `
      <div class="absolute top-4 left-4 bg-black/80 text-green-400 p-2 rounded font-mono text-xs">
        DEV MODE ACTIVE
      </div>
    `
    document.body.appendChild(overlay)

    setTimeout(() => {
      document.body.removeChild(overlay)
    }, 5000)
  }

  const toggleMatrixMode = () => {
    setShowMatrix(!showMatrix)
    document.body.classList.toggle("matrix-mode")

    if ((window as any).showNotification) {
      ;(window as any).showNotification({
        type: "success",
        title: "Matrix Mode Activated! 🕶️",
        message: "Welcome to the real world, Neo...",
        duration: 4000,
      })
    }
  }

  const activateSecretMode = () => {
    // Activate all easter eggs at once
    document.body.classList.add("secret-mode")

    if ((window as any).showNotification) {
      ;(window as any).showNotification({
        type: "success",
        title: "🎉 SECRET MODE UNLOCKED! 🎉",
        message: "You've discovered all the hidden features!",
        duration: 10000,
      })
    }

    // Trigger confetti effect
    createConfetti()
  }

  const revealSecret = () => {
    const randomSecret = secrets[Math.floor(Math.random() * secrets.length)]
    if (!discoveredSecrets.includes(randomSecret)) {
      setDiscoveredSecrets((prev) => [...prev, randomSecret])

      if ((window as any).showNotification) {
        ;(window as any).showNotification({
          type: "success",
          title: "Secret Discovered! 🔍",
          message: randomSecret,
          duration: 8000,
        })
      }
    }
  }

  const createConfetti = () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div")
      confetti.style.position = "fixed"
      confetti.style.left = Math.random() * 100 + "vw"
      confetti.style.top = "-10px"
      confetti.style.width = "10px"
      confetti.style.height = "10px"
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.pointerEvents = "none"
      confetti.style.zIndex = "9999"
      confetti.style.borderRadius = "50%"

      document.body.appendChild(confetti)

      const animation = confetti.animate(
        [
          { transform: "translateY(-10px) rotate(0deg)", opacity: 1 },
          { transform: `translateY(${window.innerHeight + 10}px) rotate(720deg)`, opacity: 0 },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        },
      )

      animation.onfinish = () => {
        document.body.removeChild(confetti)
      }
    }
  }

  return (
    <>
      {/* Hacking Terminal Overlay */}
      <AnimatePresence>
        {isHacking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-black border border-green-500 rounded-lg p-6 max-w-2xl w-full mx-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="text-green-500" />
                <span className="text-green-500 font-mono">HACKING IN PROGRESS...</span>
              </div>

              <div className="space-y-2 mb-4">
                {hackingStages.slice(0, hackingStage + 1).map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-green-400 font-mono text-sm"
                  >
                    {index === hackingStage ? (
                      <span className="flex items-center">
                        <span className="animate-pulse mr-2">▶</span>
                        {stage}
                      </span>
                    ) : (
                      <span className="text-green-600">✓ {stage}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-green-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(hackingProgress)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    className="bg-green-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${hackingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {hackingStage === hackingStages.length - 1 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <p className="text-green-400 font-mono text-lg">HACK ATTEMPT FAILED</p>
                  <p className="text-green-600 text-sm mt-2">This portfolio is built with security in mind! 🛡️</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Rain Effect */}
      {showMatrix && (
        <div className="fixed inset-0 pointer-events-none z-30">
          <canvas id="matrix-canvas" className="w-full h-full" style={{ background: "rgba(0, 0, 0, 0.1)" }} />
        </div>
      )}

      {/* Secret Discovery Panel */}
      {discoveredSecrets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-20 right-4 bg-card border rounded-lg p-4 shadow-lg z-40 max-w-sm"
        >
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Secrets Discovered
          </h3>
          <div className="space-y-1">
            {discoveredSecrets.map((secret, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-muted-foreground"
              >
                {secret}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hidden Instructions */}
      <div className="hidden">
        <p>Easter Egg Instructions:</p>
        <ul>
          <li>Ctrl+Shift+H: Start hacking simulation</li>
          <li>Ctrl+Shift+D: Toggle developer mode</li>
          <li>Alt+M: Matrix mode</li>
          <li>Click logo 10 times: Secret mode</li>
          <li>Konami code: Party mode</li>
        </ul>
      </div>
    </>
  )
}
