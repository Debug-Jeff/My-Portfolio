"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SkillBox from "@/components/skill-box"
import SkillTicker from "@/components/skill-ticker"

export default function SkillsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const languages = [
    { name: "Python", icon: "python" },
    { name: "JavaScript", icon: "javascript" },
    { name: "TypeScript", icon: "typescript" },
    { name: "HTML", icon: "html" },
    { name: "CSS", icon: "css" },
  ]

  const frameworks = [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Django", icon: "django" },
    { name: "Express.js", icon: "express" },
    { name: "Tailwind CSS", icon: "tailwind" },
  ]

  const tools = [
    { name: "Figma", icon: "figma" },
    { name: "GitHub", icon: "github" },
    { name: "VS Code", icon: "vscode" },
    { name: "WordPress", icon: "wordpress" },
    { name: "Docker", icon: "docker" },
    { name: "Linux", icon: "linux" },
  ]

  const databases = [
    { name: "MongoDB", icon: "mongodb" },
    { name: "MySQL", icon: "mysql" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "REST APIs", icon: "api" },
    { name: "GraphQL", icon: "graphql" },
  ]

  const security = [
    { name: "Kali Linux", icon: "kali" },
    { name: "Nmap", icon: "nmap" },
    { name: "Metasploit", icon: "metasploit" },
    { name: "Burp Suite", icon: "burp" },
    { name: "Wireshark", icon: "wireshark" },
  ]

  // Combine all skills for tickers
  const allSkills = [...languages, ...frameworks, ...tools, ...databases, ...security]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto py-16 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h1>

        <SkillTicker skills={allSkills} direction="left" />

        <motion.div
          className="mt-12"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Languages & Frameworks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {languages.map((skill, index) => (
              <SkillBox key={index} name={skill.name} icon={skill.icon} delay={index * 0.1} />
            ))}
            {frameworks.map((skill, index) => (
              <SkillBox
                key={`framework-${index}`}
                name={skill.name}
                icon={skill.icon}
                delay={(languages.length + index) * 0.1}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Tools & Platforms</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {tools.map((skill, index) => (
              <SkillBox key={index} name={skill.name} icon={skill.icon} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Databases & APIs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {databases.map((skill, index) => (
              <SkillBox key={index} name={skill.name} icon={skill.icon} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Cybersecurity Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {security.map((skill, index) => (
              <SkillBox key={index} name={skill.name} icon={skill.icon} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        <SkillTicker skills={allSkills} direction="right" />
      </main>

      <Footer />
    </div>
  )
}
