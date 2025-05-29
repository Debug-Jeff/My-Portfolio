"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagneticElementProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function MagneticElement({ children, className = "", strength = 0.3 }: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 300 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const maxDistance = Math.max(rect.width, rect.height)

      if (distance < maxDistance) {
        x.set(deltaX * strength)
        y.set(deltaY * strength)
      }
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [x, y, strength])

  return (
    <motion.div ref={ref} className={`magnetic ${className}`} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  )
}
