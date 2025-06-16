"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function MinimalLandingPage() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // Auto-advance after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleExit()
    }, 10000) // 10 seconds

    return () => clearTimeout(timer)
  }, [])

  // Show content after mount
  useEffect(() => {
    setShowContent(true)
  }, [])

  const handleExit = () => {
    if (isExiting) return
    setIsExiting(true)
    
    // Add a small delay for the exit animation, then navigate
    setTimeout(() => {
      router.push('/home')
    }, 300) // Match the exit animation duration
  }

  // Global click/tap handler
  useEffect(() => {
    const handleGlobalClick = () => {
      handleExit()
    }

    if (showContent && !isExiting) {
      document.addEventListener('click', handleGlobalClick)
      document.addEventListener('touchstart', handleGlobalClick)
    }

    return () => {
      document.removeEventListener('click', handleGlobalClick)
      document.removeEventListener('touchstart', handleGlobalClick)
    }
  }, [showContent, isExiting])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden cursor-pointer">
      
      {/* Subtle background gradient animation */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      <AnimatePresence mode="wait">
        {showContent && !isExiting && (
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center px-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.95,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Main Name Display */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: 0.3,
                ease: "easeOut"
              }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-wider text-white">
                <span className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
                  JEFF MUTUGI
                </span>
              </h1>
            </motion.div>

            {/* Typewriter Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.0 }}
              className="flex flex-col items-center"
            >
              <TypewriterText 
                text="System.initialize('portfolio_v2.0')" 
                className="text-xl md:text-2xl text-indigo-300 font-mono tracking-wide"
                delay={2.0}
              />
              
              {/* Subtle hint text */}
              {/* <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5, duration: 1.5 }}
                className="text-slate-400 text-sm mt-8 font-light tracking-wide"
              >
                Click anywhere to continue
              </motion.p> */}
            </motion.div>
          </motion.div>
        )}

        {isExiting && (
          <motion.div
            className="relative z-10 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-slate-300 text-lg font-light">
              Loading portfolio...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent && !isExiting ? 1 : 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 30, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  )
}

// Typewriter Text Component
function TypewriterText({ text, className = "", delay = 0 }) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1))
          index++
        } else {
          setIsComplete(true)
          clearInterval(typeInterval)
          
          // Start cursor blinking after typing is complete
          const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
          }, 600)
          
          return () => clearInterval(cursorInterval)
        }
      }, 80) // Slightly slower typing for elegance

      return () => clearInterval(typeInterval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <div className={`${className} flex items-center justify-center`}>
      <span>{displayText}</span>
      <motion.span
        className="ml-1 inline-block w-0.5 h-6 bg-indigo-300"
        animate={{ 
          opacity: isComplete ? (showCursor ? 1 : 0) : 1,
          scaleY: isComplete ? 1 : [1, 1, 0.3, 1]
        }}
        transition={{ 
          opacity: { duration: 0.1 },
          scaleY: { duration: 0.8, repeat: Infinity }
        }}
      />
    </div>
  )
}