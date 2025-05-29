"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedCode from "@/components/animated-code"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <motion.div
            className="w-full md:w-1/2"
            initial={{ x: -100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Hello, I'm <span className="text-primary">Jeff Mutugi</span>
            </h1>

            <p className="text-lg mb-6">
              A passionate developer and cybersecurity specialist with a focus on building secure, interactive web
              applications and exploring the depths of offensive security.
            </p>

            <p className="text-lg mb-6">
              With expertise in both development and cybersecurity, I bring a unique perspective to creating robust
              digital solutions that prioritize both user experience and security.
            </p>

            <div className="flex gap-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                View Projects
              </button>
              <button className="px-6 py-3 border border-primary text-primary hover:bg-primary/10 rounded-md transition-colors">
                Contact Me
              </button>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 mt-8 md:mt-0"
            initial={{ x: 100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card border rounded-lg shadow-lg p-4 h-[400px] overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm text-muted-foreground">code.tsx</div>
              </div>

              <AnimatedCode />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
