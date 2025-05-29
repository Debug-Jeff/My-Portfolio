"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface SkillBoxProps {
  name: string
  icon: string
  delay?: number
}

export default function SkillBox({ name, icon, delay = 0 }: SkillBoxProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="bg-card border rounded-lg p-4 text-center shadow-sm transition-all duration-300 hover:shadow-lg"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
        }}
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))"
            : undefined,
        }}
      >
        <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-2xl">{getIconForSkill(icon)}</div>
        <h3 className="text-sm font-medium">{name}</h3>
      </motion.div>

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{
                x: "50%",
                y: "50%",
                opacity: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 200}%`,
                y: `${50 + (Math.random() - 0.5) * 200}%`,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function getIconForSkill(icon: string): string {
  const iconMap: { [key: string]: string } = {
    python: "🐍",
    javascript: "🟨",
    typescript: "🔷",
    html: "🌐",
    css: "🎨",
    react: "⚛️",
    nextjs: "▲",
    django: "🎯",
    express: "🚀",
    tailwind: "💨",
    figma: "🎨",
    github: "🐙",
    vscode: "💻",
    wordpress: "📝",
    docker: "🐳",
    linux: "🐧",
    mongodb: "🍃",
    mysql: "🐬",
    postgresql: "🐘",
    api: "🔌",
    graphql: "📊",
    kali: "🔒",
    nmap: "🗺️",
    metasploit: "🎯",
    burp: "🔍",
    wireshark: "🦈",
  }

  return iconMap[icon] || "⚡"
}
