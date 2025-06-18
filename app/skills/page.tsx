"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function SkillsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const fullStackCarouselRef = useRef(null)
  const cyberCarouselRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Full-Stack Technologies with real logo URLs
  const fullStackTech = [
    { name: "React", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", color: "#61DAFB" },
    { name: "Next.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg", color: "#000000" },
    { name: "JavaScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
    { name: "TypeScript", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", color: "#3178C6" },
    { name: "Python", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", color: "#3776AB" },
    { name: "Node.js", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", color: "#339933" },
    { name: "Express", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg", color: "#000000" },
    { name: "Django", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg", color: "#092E20" },
    { name: "MongoDB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg", color: "#47A248" },
    { name: "PostgreSQL", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg", color: "#336791" },
    { name: "MySQL", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg", color: "#4479A1" },
    { name: "Docker", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", color: "#2496ED" },
    { name: "Git", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", color: "#F05032" },
    { name: "Tailwind", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg", color: "#06B6D4" },
    { name: "HTML5", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", color: "#E34F26" },
    { name: "CSS3", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", color: "#1572B6" }
  ]

  // Cybersecurity Tools with representative logos/icons
  const cyberSecTech = [
    { name: "Kali Linux", logo: "https://raw.githubusercontent.com/canaleal/devicon/new-icon--kali-linux/icons/kalilinux/kalilinux-original.svg", color: "#557C94" },
    { name: "Metasploit", logo: "https://www.kali.org/tools/metasploit-framework/images/metasploit-framework-logo.svg", color: "#2596BE", fallback: "🚀" },
    { name: "Burp Suite", logo: "https://portswigger.net/content/images/logos/burp-suite-logo.svg", color: "#FF6633", fallback: "🔧" },
    { name: "Nmap", logo: "https://nmap.org/images/nmap-logo-256x256.png", color: "#0E4B99", fallback: "🔍" },
    { name: "Wireshark", logo: "https://www.wireshark.org/assets/theme-2015/images/wireshark_logo.png", color: "#1679A7", fallback: "🦈" },
    { name: "OWASP ZAP", logo: "https://raw.githubusercontent.com/zaproxy/zaproxy/main/zap/src/main/resources/resource/zap1024x1024.png", color: "#00549E", fallback: "⚡" },
    { name: "Nessus", logo: "https://static-www.elastic.co/v3/assets/bltefdd0b53ddbbfdbf/blt36f2da8d650732a0/5d0823c3d8ff351753cbc99f/nessus-logo-color-100x100.png", color: "#00C176", fallback: "🛡️" },
    { name: "Aircrack-ng", logo: "https://www.aircrack-ng.org/doku.php?id=aircrack-ng", color: "#FF6B35", fallback: "📡" },
    { name: "John the Ripper", logo: "https://www.openwall.com/john/", color: "#8B0000", fallback: "🔐" },
    { name: "Hashcat", logo: "https://hashcat.net/", color: "#FF4444", fallback: "🔓" },
    { name: "Netcat", logo: "https://nmap.org/", color: "#4A90E2", fallback: "🐱" },
    { name: "Hydra", logo: "https://github.com/vanhauser-thc/thc-hydra", color: "#FF3366", fallback: "🌊" },
    { name: "Nikto", logo: "https://cirt.net/nikto2", color: "#9B59B6", fallback: "🔎" },
    { name: "SQLmap", logo: "http://sqlmap.org/", color: "#E74C3C", fallback: "💉" },
    { name: "Maltego", logo: "https://www.maltego.com/", color: "#1ABC9C", fallback: "🕸️" },
    { name: "Shodan", logo: "https://www.shodan.io/", color: "#C0392B", fallback: "👁️" }
  ]

  // For cybersecurity tools, we'll use text-based logos since many don't have public SVG logos
  const cyberSecDisplay = cyberSecTech.map(tech => ({
    ...tech,
    displayIcon: tech.fallback || tech.name.charAt(0)
  }))

  // Create seamless loops with 3 copies for smoother transition
  const fullStackLoop = [...fullStackTech, ...fullStackTech, ...fullStackTech]
  const cyberSecLoop = [...cyberSecDisplay, ...cyberSecDisplay, ...cyberSecDisplay]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Technology Arsenal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crafting secure digital experiences through full-stack development and cybersecurity expertise
          </p>
        </motion.div>

        {/* Full-Stack Development Section */}
        <motion.section 
          className="mb-32"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Full-Stack Development
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-primary to-primary/50 mx-auto"></div>
          </div>
          
          {/* Clean Carousel with Fog Effect */}
          <div className="relative py-8">
            {/* Carousel Container with extra padding for hover scaling */}
            <div className="overflow-hidden relative">
              <motion.div
                ref={fullStackCarouselRef}
                className="flex space-x-16 py-4"
                animate={{
                  x: [-160 * fullStackTech.length, -160 * fullStackTech.length * 2]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: fullStackTech.length * 2.5,
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
                      zIndex: 10,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    onMouseEnter={() => {
                      // Only handle mouse events on non-touch devices
                      if (!('ontouchstart' in window)) {
                        const carousel = fullStackCarouselRef.current
                        if (carousel) {
                          carousel.style.animationPlayState = 'paused'
                        }
                      }
                    }}
                    onMouseLeave={() => {
                      // Only handle mouse events on non-touch devices
                      if (!('ontouchstart' in window)) {
                        const carousel = fullStackCarouselRef.current
                        if (carousel) {
                          carousel.style.animationPlayState = 'running'
                        }
                      }
                    }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <Image
                        src={tech.logo}
                        alt={`${tech.name} logo`}
                        width={64}
                        height={64}
                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          // Fallback to styled text if image fails to load
                          e.currentTarget.style.display = 'none'
                          const fallbackDiv = e.currentTarget.nextElementSibling
                          if (fallbackDiv) {
                            fallbackDiv.style.display = 'flex'
                          }
                        }}
                      />
                      <div 
                        className="absolute inset-0 hidden items-center justify-center text-2xl font-bold rounded-lg grayscale group-hover:grayscale-0"
                        style={{ backgroundColor: tech.color + '20', color: tech.color }}
                      >
                        {tech.name.charAt(0)}
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {tech.name}
                    </h3>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Left Fog Gradient */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10"></div>
              
              {/* Right Fog Gradient */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10"></div>
            </div>
          </div>
        </motion.section>

        {/* Cybersecurity Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Cybersecurity Arsenal
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-red-500 to-orange-500 mx-auto"></div>
          </div>
          
          {/* Clean Carousel with Fog Effect - Moving Right to Left */}
          <div className="relative py-8">
            {/* Carousel Container with extra padding for hover scaling */}
            <div className="overflow-hidden relative">
              <motion.div
                ref={cyberCarouselRef}
                className="flex space-x-16 py-4"
                animate={{
                  x: [-160 * cyberSecDisplay.length * 2, -160 * cyberSecDisplay.length]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: cyberSecDisplay.length * 2.5,
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
                      zIndex: 10,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    onMouseEnter={() => {
                      // Only handle mouse events on non-touch devices
                      if (!('ontouchstart' in window)) {
                        const carousel = cyberCarouselRef.current
                        if (carousel) {
                          carousel.style.animationPlayState = 'paused'
                        }
                      }
                    }}
                    onMouseLeave={() => {
                      // Only handle mouse events on non-touch devices
                      if (!('ontouchstart' in window)) {
                        const carousel = cyberCarouselRef.current
                        if (carousel) {
                          carousel.style.animationPlayState = 'running'
                        }
                      }
                    }}
                  >
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center text-3xl font-bold transition-all duration-300 grayscale group-hover:grayscale-0"
                      style={{
                        backgroundColor: tech.color + '20',
                        color: tech.color,
                      }}
                    >
                      {tech.displayIcon}
                    </div>
                    <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {tech.name}
                    </h3>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Left Fog Gradient */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10"></div>
              
              {/* Right Fog Gradient */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10"></div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's combine these technologies to create secure, scalable, and innovative solutions 
            for your next project.
          </p>
          <Link href="/contact">
            <motion.button
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}