"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import MatrixRain from "@/components/matrix-rain"

export default function CoverPage() {
  const [showContent, setShowContent] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Show content after initial delay
    const showTimer = setTimeout(() => {
      setShowContent(true)
    }, 1000)

    // Start fade out after 4 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 4000)

    // Navigate to landing page after fade completes
    const navigateTimer = setTimeout(() => {
      router.push("/landing")
    }, 5500)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
      clearTimeout(navigateTimer)
    }
  }, [router])

  return (
    <AnimatePresence>
      <motion.div
        className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden matrix-effect"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <MatrixRain />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="z-10 text-center"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4 tracking-wider"
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          >
            JEFF MUTUGI
          </motion.h1>

          <motion.div
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 space-y-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-green-400 font-mono"
            >
              {">"} Cybersecurity Specialist
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-blue-400 font-mono"
            >
              {">"} Full-stack Developer
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
              className="text-purple-400 font-mono"
            >
              {">"} Digital Builder
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="text-red-400 font-mono"
            >
              {">"} Ethical Hacker
            </motion.div>
          </motion.div>

          <motion.div
            className="text-sm md:text-base text-gray-500 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            Initializing portfolio...
          </motion.div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
