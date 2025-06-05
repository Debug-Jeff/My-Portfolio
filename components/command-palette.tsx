"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Search, Home, User, Code, Briefcase, MessageSquare, Mail, Download, Moon, Sun, Shield } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Command {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action: () => void
  keywords: string[]
  category: string
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const commands: Command[] = [
    {
      id: "home",
      title: "Go to Home",
      description: "Navigate to the home page",
      icon: <Home size={16} />,
      action: () => router.push("/home"),
      keywords: ["home", "main", "start"],
      category: "Navigation",
    },
    {
      id: "about",
      title: "About Me",
      description: "Learn more about Jeff Mutugi",
      icon: <User size={16} />,
      action: () => router.push("/about"),
      keywords: ["about", "bio", "profile", "jeff"],
      category: "Navigation",
    },
    {
      id: "skills",
      title: "Skills & Technologies",
      description: "View technical skills and expertise",
      icon: <Code size={16} />,
      action: () => router.push("/skills"),
      keywords: ["skills", "tech", "technologies", "programming"],
      category: "Navigation",
    },
    {
      id: "projects",
      title: "Projects Portfolio",
      description: "Browse through my projects",
      icon: <Briefcase size={16} />,
      action: () => router.push("/projects"),
      keywords: ["projects", "portfolio", "work", "code"],
      category: "Navigation",
    },
    {
      id: "testimonials",
      title: "Testimonials",
      description: "Read what others say about my work",
      icon: <MessageSquare size={16} />,
      action: () => router.push("/testimonials"),
      keywords: ["testimonials", "reviews", "feedback"],
      category: "Navigation",
    },
    {
      id: "contact",
      title: "Contact Me",
      description: "Get in touch for collaborations",
      icon: <Mail size={16} />,
      action: () => router.push("/contact"),
      keywords: ["contact", "email", "message", "hire"],
      category: "Navigation",
    },
    {
      id: "resume",
      title: "Download Resume",
      description: "Download my latest resume/CV",
      icon: <Download size={16} />,
      action: () => {
        // Create a dummy resume download
        const link = document.createElement("a")
        link.href = "/not-yet-nuclear.pdf"
        link.download = "Jeff-Mutugi-Resume.pdf"
        link.click()
      },
      keywords: ["resume", "cv", "download", "pdf"],
      category: "Actions",
    },
    {
      id: "theme-toggle",
      title: "Toggle Theme",
      description: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
      keywords: ["theme", "dark", "light", "mode"],
      category: "Settings",
    },
    {
      id: "request-project",
      title: "Request Project",
      description: "Submit a detailed project request",
      icon: <Briefcase size={16} />,
      action: () => router.push("/request-project"),
      keywords: ["request", "project", "hire", "work"],
      category: "Actions",
    },
  ]

  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(query.toLowerCase()) ||
      command.description.toLowerCase().includes(query.toLowerCase()) ||
      command.keywords.some((keyword) => keyword.toLowerCase().includes(query.toLowerCase())),
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
        setQuery("")
        setSelectedIndex(0)
      }

      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
        setSelectedIndex(0)
      }

      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
        }

        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
        }

        if (e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault()
          filteredCommands[selectedIndex].action()
          setIsOpen(false)
          setQuery("")
          setSelectedIndex(0)
        }
      }
    },
    [isOpen, filteredCommands, selectedIndex],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const groupedCommands = filteredCommands.reduce(
    (acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = []
      }
      acc[command.category].push(command)
      return acc
    },
    {} as Record<string, Command[]>,
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="command-palette w-full max-w-2xl mx-4 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border/50">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <Input
                  placeholder="Type a command or search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 border-0 bg-transparent focus:ring-0 text-lg"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {Object.entries(groupedCommands).map(([category, commands]) => (
                <div key={category} className="mb-4">
                  <div className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {category}
                  </div>
                  {commands.map((command, index) => {
                    const globalIndex = filteredCommands.indexOf(command)
                    return (
                      <motion.div
                        key={command.id}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                          selectedIndex === globalIndex ? "bg-accent" : "hover:bg-accent/50"
                        }`}
                        onClick={() => {
                          command.action()
                          setIsOpen(false)
                          setQuery("")
                          setSelectedIndex(0)
                        }}
                        whileHover={{ x: 2 }}
                      >
                        <div className="text-muted-foreground">{command.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{command.title}</div>
                          <div className="text-sm text-muted-foreground">{command.description}</div>
                        </div>
                        {command.keywords.length > 0 && (
                          <div className="flex gap-1">
                            {command.keywords.slice(0, 2).map((keyword) => (
                              <Badge key={keyword} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              ))}

              {filteredCommands.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No commands found</p>
                  <p className="text-sm">Try searching for something else</p>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-border/50 text-xs text-muted-foreground flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘</kbd>
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">K</kbd>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
