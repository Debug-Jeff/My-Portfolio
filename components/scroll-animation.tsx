"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
}

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  direction = "up",
  once = true,
}: ScrollAnimationProps) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [once])

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 50, x: 0 }
      case "down":
        return { y: -50, x: 0 }
      case "left":
        return { x: 50, y: 0 }
      case "right":
        return { x: -50, y: 0 }
      default:
        return { y: 50, x: 0 }
    }
  }

  const initialPosition = getInitialPosition()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...initialPosition,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              ...initialPosition,
            }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
