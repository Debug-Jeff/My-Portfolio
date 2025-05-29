"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterEffectProps {
  text: string
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
}

export default function TypewriterEffect({
  text,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < text.length) {
            setDisplayedText(text.slice(0, currentIndex + 1))
            setCurrentIndex(currentIndex + 1)
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          if (currentIndex > 0) {
            setDisplayedText(text.slice(0, currentIndex - 1))
            setCurrentIndex(currentIndex - 1)
          } else {
            setIsDeleting(false)
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, isDeleting, text, speed, deleteSpeed, pauseDuration])

  return (
    <h1 className="text-4xl md:text-5xl font-bold">
      {displayedText}
      <motion.span
        className="inline-block w-1 h-8 bg-primary ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
      />
    </h1>
  )
}
