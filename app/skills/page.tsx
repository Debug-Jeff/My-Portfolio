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

  // Full-Stack Technologies
  const fullStackTech = [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#000000" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3178C6" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
    { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", color: "#000000" },
    { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", color: "#092E20" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#336791" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ED" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
    { name: "Tailwind", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", color: "#06B6D4" },
    { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26" },
    { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6" }
  ]

  // Cybersecurity Tools
  const cyberSecTech = [
    { name: "Kali Linux", logo: "https://www.kali.org/images/kali-logo.svg", color: "#557C94" },
    { name: "Metasploit", logo: "https://www.vectorlogo.zone/logos/metasploit/metasploit-icon.svg", color: "#2596BE"},
    { name: "Burp Suite", logo: "https://portswigger.net/content/images/logos/burp-suite-logo.svg", color: "#FF6633"},
    { name: "Nmap", logo: "https://nmap.org/images/nmap-logo-256x256.png", color: "#0E4B99"},
    { name: "Wireshark", logo: "https://www.vectorlogo.zone/logos/wireshark/wireshark-icon.svg", color: "#00549E"},
    { name: "Nessus", logo: "https://www.tenable.com/sites/drupal.dmz.tenablesecurity.com/files/images/brand-assets/Nessus_Logo_FullColor.svg", color: "#00C176"},
    { name: "Aircrack-ng", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Aircrack-ng-new-logo.svg/512px-Aircrack-ng-new-logo.svg.png", color: "#FF6B35"},
    { name: "John the Ripper", logo: "https://www.openwall.com/john/g/john-the-ripper.png", color: "#8B0000"},
    { name: "Hashcat", logo: "https://hashcat.net/misc/example_hashes/hashcat.png", color: "#FF4444"},
    { name: "Netcat", logo: "https://nmap.org/ncat/images/ncat-logo-64.png", color: "#4A90E2"},
    { name: "Hydra", logo: "https://tools.kali.org/wp-content/uploads/2014/02/hydra-logo.png", color: "#FF3366"},
    { name: "Nikto", logo: "https://cirt.net/nikto2-docs/nikto.png", color: "#9B59B6"},
    { name: "SQLmap", logo: "https://sqlmap.org/images/sqlmap-logo.png", color: "#E74C3C"},
    { name: "Maltego", logo: "https://www.maltego.com/images/uploads/maltego-logo.svg", color: "#1ABC9C" },
    { name: "Shodan", logo: "https://help.shodan.io/static/img/shodan-logo-red.png", color: "#C0392B"}
  ]

  // Create seamless loops 
  const fullStackLoop = [...fullStackTech, ...fullStackTech, ...fullStackTech]
  const cyberSecLoop = [...cyberSecTech, ...cyberSecTech, ...cyberSecTech]

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
            <div className="overflow-hidden relative">
              <motion.div
                ref={cyberCarouselRef}
                className="flex space-x-16 py-4"
                animate={{
                  x: [-160 * cyberSecTech.length * 2, -160 * cyberSecTech.length]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: cyberSecTech.length * 2.5,
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