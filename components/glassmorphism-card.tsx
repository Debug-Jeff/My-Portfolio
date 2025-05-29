"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlassmorphismCardProps {
  children: ReactNode
  className?: string
  blur?: "sm" | "md" | "lg" | "xl"
  opacity?: number
}

export default function GlassmorphismCard({
  children,
  className = "",
  blur = "md",
  opacity = 0.1,
}: GlassmorphismCardProps) {
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  }

  return (
    <motion.div
      className={`
        ${blurClasses[blur]}
        border border-white/20 dark:border-white/10
        rounded-lg
        shadow-glass dark:shadow-glass-dark
        ${className}
      `}
      style={{
        background: `rgba(255, 255, 255, ${opacity})`,
      }}
      whileHover={{
        background: `rgba(255, 255, 255, ${opacity + 0.05})`,
        borderColor: "rgba(255, 255, 255, 0.3)",
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
