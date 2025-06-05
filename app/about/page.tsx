"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Shield, Code, Users, Award } from "lucide-react"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const highlights = [
    {
      icon: Shield,
      title: "Cybersecurity Focus",
      value: "Offensive Security & Ethical Hacking"
    },
    {
      icon: Code,
      title: "Development Experience",
      value: "Full-Stack Web Development"
    },
    {
      icon: Award,
      title: "Recent Achievement",
      value: "NASA Space Apps Winner 2024"
    },
    {
      icon: Users,
      title: "Leadership",
      value: "Tech Club Official"
    }
  ]

  const professionalFacts = [
    { label: "Focus Area", value: "Cybersecurity & Development" },
    { label: "Education", value: "Computer Science Student" },
    { label: "Languages", value: "English, Swahili" },
    { label: "Specialization", value: "Penetration Testing" }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto py-20 px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cybersecurity enthusiast and full-stack developer specializing in offensive security, 
            with proven experience in building innovative solutions and winning hackathons.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start mb-20">
          <motion.div
            className="w-full lg:w-1/3 flex justify-center"
            initial={{ x: -100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Modern hexagonal frame */}
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 transform rotate-90 rounded-3xl"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-background to-muted rounded-2xl transform rotate-90 shadow-2xl"></div>
                <div className="absolute inset-4 rounded-xl overflow-hidden transform rotate-90">
                  <div className="w-full h-full transform -rotate-90 scale-110">
                    <Image 
                      src="/jeff-image-1.jpg?height=300&width=300" 
                      alt="Jeff Mutugi - Cybersecurity Professional" 
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 space-y-8"
            initial={{ x: 100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">Professional Overview</h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Computer Science student at Africa Nazarene University with a strong focus on cybersecurity 
                and full-stack development. Winner of the 2024 NASA Space Apps Hackathon (Kenya) for developing 
                an innovative space orrery system.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Experienced in penetration testing, CTF competitions, and building production-ready applications 
                using modern technologies including React, Next.js, Python, and Django. Active contributor to 
                tech communities and official at university's Cyberene tech club.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Core Expertise</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg bg-card border"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {professionalFacts.map((fact, index) => (
            <motion.div
              key={index}
              className="bg-card border rounded-lg p-6 text-center shadow-sm"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" 
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                {fact.label}
              </h3>
              <p className="text-lg font-semibold">{fact.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Collaborate?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're looking for cybersecurity expertise, full-stack development, 
            or innovative problem-solving, I'm always open to discussing new opportunities 
            and challenging projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <motion.button
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Projects
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                className="px-8 py-3 border border-primary text-primary rounded-lg font-medium w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}