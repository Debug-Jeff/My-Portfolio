"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function FloatingText() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const floatingTexts = [
    { text: "JEFF", delay: 0 },
    { text: "MUTUGI", delay: 0.5 },
    { text: "DEVELOPER", delay: 1 },
    { text: "SECURITY", delay: 1.5 },
    { text: "HACKER", delay: 2 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingTexts.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-6xl md:text-8xl font-bold text-primary/10 select-none"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            x: mousePosition.x * (0.1 + index * 0.02),
            y: mousePosition.y * (0.1 + index * 0.02),
            opacity: [0, 0.3, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: item.delay,
            ease: "linear",
          }}
          style={{
            transform: `translate(${mousePosition.x * (0.1 + index * 0.02)}px, ${mousePosition.y * (0.1 + index * 0.02)}px)`,
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  )
}
