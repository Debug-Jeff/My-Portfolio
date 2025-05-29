"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function EasterEggs() {
  const [konamiActivated, setKonamiActivated] = useState(false)
  const [sequence, setSequence] = useState<string[]>([])
  const [clickCount, setClickCount] = useState(0)

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setSequence((prev) => {
        const newSequence = [...prev, e.code].slice(-konamiCode.length)

        if (newSequence.join(",") === konamiCode.join(",")) {
          setKonamiActivated(true)
          document.body.classList.add("konami-activated")

          // Show notification
          if ((window as any).showNotification) {
            ;(window as any).showNotification({
              type: "success",
              title: "Konami Code Activated! 🎉",
              message: "You found the secret! The site is now in party mode!",
              duration: 10000,
            })
          }

          setTimeout(() => {
            setKonamiActivated(false)
            document.body.classList.remove("konami-activated")
          }, 10000)
        }

        return newSequence
      })
    }

    // Logo click easter egg
    const handleLogoClick = () => {
      setClickCount((prev) => {
        const newCount = prev + 1
        if (newCount === 7) {
          if ((window as any).showNotification) {
            ;(window as any).showNotification({
              type: "info",
              title: "Persistent, aren't you? 😄",
              message: "Try the Konami code: ↑↑↓↓←→←→BA",
              duration: 8000,
            })
          }
          return 0
        }
        return newCount
      })
    }

    document.addEventListener("keydown", handleKeyDown)

    // Add click listener to logo
    const logos = document.querySelectorAll('a[href="/landing"]')
    logos.forEach((logo) => {
      logo.addEventListener("click", handleLogoClick)
    })

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      logos.forEach((logo) => {
        logo.removeEventListener("click", handleLogoClick)
      })
    }
  }, [])

  // Secret developer console message
  useEffect(() => {
    console.log("%cHey there, fellow developer! 👋", "color: #8b5cf6; font-size: 20px; font-weight: bold;")
    console.log("%cI see you're checking out the console. Nice! 🕵️‍♂️", "color: #a855f7; font-size: 14px;")
    console.log("%cTry the Konami code: ↑↑↓↓←→←→BA", "color: #c084fc; font-size: 12px;")
    console.log("%cOr click my logo 7 times for a hint! 😉", "color: #d8b4fe; font-size: 12px;")
  }, [])

  return (
    <>
      {konamiActivated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-40"
        >
          {/* Confetti effect */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </>
  )
}
