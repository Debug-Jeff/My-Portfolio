"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, MessageCircle, Bot } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Debug-Jeff/",
    icon: Github,
    color: "#333",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jeff-m-7a2123305/",
    icon: Linkedin,
    color: "#0077B5",
  },
  {
    name: "Twitter",
    url: "https://x.com/Debug_Jeff",
    icon: Twitter,
    color: "#1DA1F2",
  },
  {
    name: "Discord",
    url: "https://discord.com/users/jeffmutugi",
    icon: Bot,
    color: "#5865F2",
  },
]

export default function SocialLinks() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((link, index) => {
        const Icon = link.icon
        return (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-3 rounded-full border border-border hover:border-primary/50 transition-colors group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Icon size={20} className="text-foreground group-hover:text-primary transition-colors" />

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary opacity-0"
              whileHover={{
                scale: [1, 1.5],
                opacity: [0, 0.5, 0],
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {link.name}
            </div>
          </motion.a>
        )
      })}
    </div>
  )
}
