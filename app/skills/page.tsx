"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function SkillsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const fullStackCarouselRef = useRef(null)
  const cyberCarouselRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Full-Stack Technologies
  const fullStackTech = [
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Next.js", icon: "▲", color: "#000000" },
    { name: "JavaScript", icon: "JS", color: "#F7DF1E" },
    { name: "TypeScript", icon: "TS", color: "#3178C6" },
    { name: "Python", icon: "🐍", color: "#3776AB" },
    { name: "Node.js", icon: "⬢", color: "#339933" },
    { name: "Express", icon: "🚀", color: "#000000" },
    { name: "Django", icon: "🎸", color: "#092E20" },
    { name: "MongoDB", icon: "🍃", color: "#47A248" },
    { name: "PostgreSQL", icon: "🐘", color: "#336791" },
    { name: "MySQL", icon: "🗄️", color: "#4479A1" },
    { name: "Docker", icon: "🐳", color: "#2496ED" },
    { name: "Git", icon: "🌿", color: "#F05032" },
    { name: "Tailwind", icon: "💨", color: "#06B6D4" },
    { name: "HTML5", icon: "🌐", color: "#E34F26" },
    { name: "CSS3", icon: "🎨", color: "#1572B6" }
  ]

  // Cybersecurity Tools
  const cyberSecTech = [
    { name: "Kali Linux", icon: "🔓", color: "#557C94" },
    { name: "Metasploit", icon: "💥", color: "#2596BE" },
    { name: "Burp Suite", icon: "🔧", color: "#FF6633" },
    { name: "Nmap", icon: "🔍", color: "#0E4B99" },
    { name: "Wireshark", icon: "🦈", color: "#1679A7" },
    { name: "OWASP ZAP", icon: "⚡", color: "#00549E" },
    { name: "Nessus", icon: "🛡️", color: "#00C176" },
    { name: "Aircrack-ng", icon: "📡", color: "#FF6B35" },
    { name: "John the Ripper", icon: "🗝️", color: "#8B0000" },
    { name: "Hashcat", icon: "🔐", color: "#FF4444" },
    { name: "Netcat", icon: "🐱", color: "#4A90E2" },
    { name: "Hydra", icon: "🐙", color: "#FF3366" },
    { name: "Nikto", icon: "🔎", color: "#9B59B6" },
    { name: "SQLmap", icon: "💉", color: "#E74C3C" },
    { name: "Maltego", icon: "🕸️", color: "#1ABC9C" },
    { name: "Shodan", icon: "👁️", color: "#C0392B" }
  ]

  // Duplicate arrays for seamless loop
  const fullStackLoop = [...fullStackTech, ...fullStackTech]
  const cyberSecLoop = [...cyberSecTech, ...cyberSecTech]

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Colorful Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(45deg, rgba(34, 197, 94, 0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(239, 68, 68, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 80px 80px, 120px 120px, 120px 120px'
        }}></div>
        
        {/* Floating colored elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-green-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-red-500/10 rounded-full blur-xl animate-pulse delay-3000"></div>
        
        {/* Gradient borders */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/50 to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-red-500/50 to-transparent"></div>
      </div>

      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section - Clean and Minimal */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-semibold mb-6 text-white">
            Technology Arsenal
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Crafting secure digital experiences through full-stack development and cybersecurity expertise
          </p>
        </motion.div>

        {/* Full-Stack Development Section */}
        <motion.section 
          className="mb-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
              Full-Stack Development
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto"></div>
          </div>
          
          {/* Clean Carousel */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={fullStackCarouselRef}
              className="flex space-x-16"
              animate={{
                x: [0, -80 * fullStackTech.length]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: fullStackTech.length * 3,
                  ease: "linear",
                },
              }}
              style={{ width: `${fullStackLoop.length * 160}px` }}
            >
              {fullStackLoop.map((tech, index) => (
                <motion.div
                  key={`fullstack-${index}`}
                  className="flex-shrink-0 group cursor-pointer text-center"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  onMouseEnter={() => {
                    if (fullStackCarouselRef.current) {
                      fullStackCarouselRef.current.style.animationPlayState = 'paused'
                    }
                  }}
                  onMouseLeave={() => {
                    if (fullStackCarouselRef.current) {
                      fullStackCarouselRef.current.style.animationPlayState = 'running'
                    }
                  }}
                >
                  <div 
                    className="text-6xl mb-4 transition-all duration-300 filter grayscale group-hover:grayscale-0"
                    style={{
                      color: tech.color,
                    }}
                  >
                    {tech.icon}
                  </div>
                  <h3 className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Cybersecurity Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
              Cybersecurity Arsenal
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </div>
          
          {/* Clean Carousel - Moving Right to Left */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={cyberCarouselRef}
              className="flex space-x-16"
              animate={{
                x: [-80 * cyberSecTech.length, 0]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: cyberSecTech.length * 3,
                  ease: "linear",
                },
              }}
              style={{ width: `${cyberSecLoop.length * 160}px` }}
            >
              {cyberSecLoop.map((tech, index) => (
                <motion.div
                  key={`cyber-${index}`}
                  className="flex-shrink-0 group cursor-pointer text-center"
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  onMouseEnter={() => {
                    if (cyberCarouselRef.current) {
                      cyberCarouselRef.current.style.animationPlayState = 'paused'
                    }
                  }}
                  onMouseLeave={() => {
                    if (cyberCarouselRef.current) {
                      cyberCarouselRef.current.style.animationPlayState = 'running'
                    }
                  }}
                >
                  <div 
                    className="text-6xl mb-4 transition-all duration-300 filter grayscale group-hover:grayscale-0"
                    style={{
                      color: tech.color,
                    }}
                  >
                    {tech.icon}
                  </div>
                  <h3 className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                    {tech.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}