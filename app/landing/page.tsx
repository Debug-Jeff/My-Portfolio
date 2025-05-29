"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import Image from "next/image"
import FloatingText from "@/components/floating-text"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after landing page is shown for a while
    const timer = setTimeout(() => {
      router.push("/home")
    }, 10000) // 10 seconds

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col md:flex-row items-center justify-center relative overflow-hidden py-16 px-4">
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-64 h-80 md:w-80 md:h-96">
            <Image
              src="/placeholder.svg?height=400&width=300"
              alt="Jeff Mutugi"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 text-center md:text-left md:pl-12"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <FloatingText />

          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Crafting Secure Systems & Interactive Experiences
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            Cybersecurity | Full-stack Dev | Builder | Hacker
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <button
              onClick={() => router.push("/home")}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Explore My Work
            </button>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
