"use client"

import { motion } from "framer-motion"

interface Skill {
  name: string
  icon: string
}

interface SkillTickerProps {
  skills: Skill[]
  direction: "left" | "right"
}

export default function SkillTicker({ skills, direction }: SkillTickerProps) {
  const duplicatedSkills = [...skills, ...skills] // Duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden py-8 hover-slow">
      <motion.div
        className={`flex space-x-8 ${direction === "left" ? "ticker-content" : "ticker-content-reverse"}`}
        style={{ width: "fit-content" }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex items-center space-x-2 bg-card border rounded-full px-4 py-2 shadow-sm whitespace-nowrap"
          >
            <span className="text-lg">{getIconForSkill(skill.icon)}</span>
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
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
