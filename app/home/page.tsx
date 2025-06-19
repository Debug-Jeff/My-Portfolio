"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Enhanced Animated Terminal Component
const EnhancedAnimatedCode = () => {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const codeLines = [
    { type: "comment", text: "// Welcome to Jeff's Digital Workspace" },
    { type: "import", text: "import { CyberSecurity, WebDev } from 'skills'" },
    { type: "variable", text: "const developer = {" },
    { type: "property", text: "  name: 'Jeff Mutugi'," },
    { type: "property", text: "  role: 'Cybersecurity Specialist'," },
    { type: "property", text: "  expertise: ['Penetration Testing', 'Web Dev']," },
    { type: "property", text: "  passion: 'Building Secure Systems'," },
    { type: "method", text: "  hack: () => 'Ethical Hacking Only! 🛡️'" },
    { type: "variable", text: "}" },
    { type: "function", text: "developer.secure() // Always!" },
    { type: "comment", text: "// Ready to collaborate? Let's build something!" }
  ]

  useEffect(() => {
    if (currentLine < codeLines.length) {
      const currentCode = codeLines[currentLine].text
      let charIndex = 0
      
      const typeInterval = setInterval(() => {
        if (charIndex <= currentCode.length) {
          setDisplayedText(currentCode.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setCurrentLine(prev => prev + 1)
            setDisplayedText("")
          }, 500)
        }
      }, 50)

      return () => clearInterval(typeInterval)
    } else {
      // Reset animation
      setTimeout(() => {
        setCurrentLine(0)
        setDisplayedText("")
      }, 3000)
    }
  }, [currentLine])

  const getTextColor = (type) => {
    switch (type) {
      case "comment": return "text-green-400"
      case "import": return "text-purple-400"
      case "variable": return "text-blue-400"
      case "property": return "text-yellow-300"
      case "method": return "text-pink-400"
      case "function": return "text-cyan-400"
      default: return "text-gray-300"
    }
  }

  return (
    <div className="font-mono text-sm leading-relaxed">
      {codeLines.slice(0, currentLine).map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${getTextColor(line.type)} mb-1`}
        >
          <span className="text-gray-500 mr-3">{String(index + 1).padStart(2, '0')}</span>
          {line.text}
        </motion.div>
      ))}
      
      {currentLine < codeLines.length && (
        <div className={`${getTextColor(codeLines[currentLine].type)} mb-1`}>
          <span className="text-gray-500 mr-3">{String(currentLine + 1).padStart(2, '0')}</span>
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-white"
          >
            |
          </motion.span>
        </div>
      )}
    </div>
  )
}

// Floating Particles Background
const FloatingParticles = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Ensure we're on the client side and window is available
    if (typeof window !== 'undefined') {
      const newParticles = Array.from({ length: 30 }, (_, i) => {
        const size = Math.random() * 4 + 1
        return {
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: size,
          duration: Math.random() * 20 + 10,
        }
      })
      setParticles(newParticles)
    }
  }, [])
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/30 dark:bg-blue-500/30"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : particle.x,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : particle.y,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// Matrix Rain Effect
const MatrixRain = () => {
  const [drops, setDrops] = useState([])
  
  useEffect(() => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*(){}[]"
    const newDrops = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      characters: Array.from({ length: 20 }, () => 
        characters[Math.floor(Math.random() * characters.length)]
      )
    }))
    setDrops(newDrops)
  }, [])
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute text-green-400 dark:text-green-400 font-mono text-xs"
          style={{ left: `${drop.x}%` }}
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800, 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: drop.delay,
            ease: "linear"
          }}
        >
          {drop.characters.map((char, index) => (
            <div key={index} className="leading-4">
              {char}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-gray-900 dark:via-black dark:to-gray-800 light:from-gray-50 light:via-white light:to-gray-100 text-white dark:text-white light:text-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Background Effects */}
      <FloatingParticles />
      <MatrixRain />
      
      {/* Ghost Profile Image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 blur-sm"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
            {/* Here you would replace this with your actual image */}
            <div className="w-full h-full bg-gradient-to-br from-gray-600/50 to-gray-800/50 dark:from-gray-600/50 dark:to-gray-800/50 light:from-gray-300/50 light:to-gray-500/50 rounded-full flex items-center justify-center">
              <div className="text-[400px] opacity-60"></div>
            </div>
          </div>
        </motion.div>
      </div> 
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20 light:from-blue-100/20 light:via-transparent light:to-purple-100/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none"></div>

      <Navbar />

      <main className="relative z-10 flex-grow container mx-auto py-24 px-4 mt-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[calc(100vh-200px)]">
          
          {/* Left Side - Main Content */}
          <motion.div
            className="w-full lg:w-3/5 text-center lg:text-left"
            initial={{ x: -100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm font-medium border border-blue-400/30 backdrop-blur-sm">
                👋 Welcome to my digital realm
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Hello, I'm{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Jeff Mutugi
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 dark:text-gray-300 light:text-gray-600 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              A passionate{" "}
              <span className="text-blue-400 font-semibold">developer</span> and{" "}
              <span className="text-purple-400 font-semibold">cybersecurity specialist</span>{" "}
              crafting secure, interactive digital experiences that protect and delight users.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <Link href="/projects">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              </Link>
              <Link href="/contact">
              <motion.button
                className="px-8 py-4 border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Terminal */}
          <motion.div
            className="w-full lg:w-2/5 flex justify-center lg:justify-end"
            initial={{ x: 100, opacity: 0, scale: 0.8 }}
            animate={isVisible ? { x: 0, opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="bg-gray-900/80 dark:bg-gray-900/80 light:bg-white/90 backdrop-blur-md border border-gray-700/50 dark:border-gray-700/50 light:border-gray-200/50 rounded-2xl shadow-2xl p-6 w-full max-w-lg relative overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-700/50 dark:border-gray-700/50 light:border-gray-200/50">
                <div className="flex gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500"
                    whileHover={{ scale: 1.2 }}
                  ></motion.div>
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-yellow-500"
                    whileHover={{ scale: 1.2 }}
                  ></motion.div>
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500"
                    whileHover={{ scale: 1.2 }}
                  ></motion.div>
                </div>
                <div className="ml-4 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 font-mono">
                  jeff@cybersec:~/portfolio $
                </div>
                <div className="ml-auto">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="min-h-[300px] relative">
                <div className="light:hidden">
                  <EnhancedAnimatedCode />
                </div>
                <div className="hidden light:block">
                  <div className="font-mono text-sm leading-relaxed text-gray-800">
                    <div className="text-green-600 mb-1">
                      <span className="text-gray-500 mr-3">01</span>
                      // Welcome to Jeff's Digital Workspace
                    </div>
                    <div className="text-purple-600 mb-1">
                      <span className="text-gray-500 mr-3">02</span>
                      import &#123; CyberSecurity, WebDev &#125; from 'skills'
                    </div>
                    <div className="text-blue-600 mb-1">
                      <span className="text-gray-500 mr-3">03</span>
                      const developer = &#123;
                    </div>
                    <div className="text-yellow-600 mb-1">
                      <span className="text-gray-500 mr-3">04</span>
                      &nbsp;&nbsp;name: 'Jeff Mutugi',
                    </div>
                    <div className="text-yellow-600 mb-1">
                      <span className="text-gray-500 mr-3">05</span>
                      &nbsp;&nbsp;role: 'Cybersecurity Specialist',
                    </div>
                    <div className="text-yellow-600 mb-1">
                      <span className="text-gray-500 mr-3">06</span>
                      &nbsp;&nbsp;expertise: ['Penetration Testing', 'Web Dev'],
                    </div>
                    <div className="text-yellow-600 mb-1">
                      <span className="text-gray-500 mr-3">07</span>
                      &nbsp;&nbsp;passion: 'Building Secure Systems',
                    </div>
                    <div className="text-pink-600 mb-1">
                      <span className="text-gray-500 mr-3">08</span>
                      &nbsp;&nbsp;hack: () => 'Ethical Hacking Only! 🛡️'
                    </div>
                    <div className="text-blue-600 mb-1">
                      <span className="text-gray-500 mr-3">09</span>
                      &#125;
                    </div>
                    <div className="text-cyan-600 mb-1">
                      <span className="text-gray-500 mr-3">10</span>
                      developer.secure() // Always!
                    </div>
                    <div className="text-green-600 mb-1">
                      <span className="text-gray-500 mr-3">11</span>
                      // Ready to collaborate? Let's build something!
                    </div>
                  </div>
                </div>
                
                {/* Scan Lines Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
                    animate={{ y: [0, 300, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  ></motion.div>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="mt-4 pt-4 border-t border-gray-700/50 dark:border-gray-700/50 light:border-gray-200/50 flex justify-between items-center text-xs text-gray-500 dark:text-gray-500 light:text-gray-600">
                <span>◉ Live Session</span>
                <span>🔒 Secure Connection</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function Home() {
  return <HomePage />
}