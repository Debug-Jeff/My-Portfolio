"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && typeof target.matches === "function") {
        if (
          target.matches('button, a, [role="button"], .cursor-pointer') ||
          target.closest('button, a, [role="button"], .cursor-pointer')
        ) {
          setIsHovering(true)
          setCursorVariant("hover")
        }
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target && typeof target.matches === "function") {
        if (
          target.matches('button, a, [role="button"], .cursor-pointer') ||
          target.closest('button, a, [role="button"], .cursor-pointer')
        ) {
          setIsHovering(false)
          setCursorVariant("default")
        }
      }
    }

    // Add event listeners
    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
    }
  }, [])

  if (!mounted) return null

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: 1,
      backgroundColor: "rgba(139, 92, 246, 0.8)",
    },
    hover: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      scale: 1.5,
      backgroundColor: "rgba(139, 92, 246, 0.6)",
    },
    click: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 0.8,
      backgroundColor: "rgba(139, 92, 246, 1)",
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      variants={variants}
      animate={isClicking ? "click" : cursorVariant}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
      }}
    />
  )
}
