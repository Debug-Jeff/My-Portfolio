"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Command {
  command: string
  output: string[]
  type?: "success" | "error" | "info"
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [currentPath, setCurrentPath] = useState("~/portfolio")
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: {
      output: [
        "Available commands:",
        "  help          - Show this help message",
        "  about         - About Jeff Mutugi",
        "  skills        - List technical skills",
        "  projects      - Show recent projects",
        "  contact       - Contact information",
        "  clear         - Clear terminal",
        "  whoami        - Current user info",
        "  ls            - List directory contents",
        "  cat <file>    - Display file contents",
        "  hack          - Try to hack the portfolio 😉",
      ],
      type: "info" as const,
    },
    about: {
      output: [
        "Jeff Mutugi - Developer & Cybersecurity Specialist",
        "",
        "🎓 Computer Science Student at Africa Nazarene University",
        "🔒 Specializing in Cybersecurity & Ethical Hacking",
        "💻 Full-stack Developer",
        "🏆 NASA Space Apps Hackathon Winner 2024",
        "",
        "Passionate about building secure applications and",
        "exploring the depths of cybersecurity.",
      ],
      type: "success" as const,
    },
    skills: {
      output: [
        "Technical Skills:",
        "",
        "Languages:     Python, JavaScript, TypeScript, HTML, CSS",
        "Frameworks:    React, Next.js, Django, Express.js",
        "Databases:     MongoDB, MySQL, PostgreSQL",
        "Security:      Kali Linux, Nmap, Metasploit, Burp Suite",
        "Tools:         Git, Docker, VS Code, Figma",
        "",
        "Specializations: Web Security, Penetration Testing, CTFs",
      ],
      type: "success" as const,
    },
    projects: {
      output: [
        "Recent Projects:",
        "",
        "🏥 Care-pulse        - Health Management System",
        "🛒 FinanceMe         - E-commerce Platform",
        "⏰ Pomodoro Timer    - Productivity Tool",
        "🤖 Robot Factory     - Interactive Game",
        "🌐 Ghost Net         - Network Scanner",
        "🚀 Space Orrery      - NASA Hackathon Winner",
        "🏥 Crowd-source      - Telemedicine App",
        "",
        "Type 'cat projects.md' for detailed descriptions",
      ],
      type: "success" as const,
    },
    contact: {
      output: [
        "Contact Information:",
        "",
        "📧 Email:     jeff.mutugi@example.com",
        "🐙 GitHub:    github.com/jeffmutugi",
        "💼 LinkedIn:  linkedin.com/in/jeffmutugi",
        "🐦 Twitter:   @jeffmutugi",
        "📍 Location:  Nairobi, Kenya",
        "",
        "Feel free to reach out for collaborations!",
      ],
      type: "info" as const,
    },
    whoami: {
      output: ["jeff-mutugi"],
      type: "success" as const,
    },
    ls: {
      output: [
        "total 8",
        "drwxr-xr-x  2 jeff jeff 4096 Dec 15 10:30 projects/",
        "drwxr-xr-x  2 jeff jeff 4096 Dec 15 10:30 skills/",
        "-rw-r--r--  1 jeff jeff 1024 Dec 15 10:30 about.txt",
        "-rw-r--r--  1 jeff jeff 2048 Dec 15 10:30 projects.md",
        "-rw-r--r--  1 jeff jeff  512 Dec 15 10:30 contact.txt",
        "-rw-r--r--  1 jeff jeff  256 Dec 15 10:30 resume.pdf",
      ],
      type: "success" as const,
    },
    hack: {
      output: [
        "Attempting to hack the portfolio...",
        "",
        "🔍 Scanning for vulnerabilities...",
        "🔒 All endpoints secured",
        "🛡️  WAF detected and active",
        "🚫 Access denied",
        "",
        "Nice try! This portfolio is built with security in mind 😄",
        "But I appreciate your curiosity!",
      ],
      type: "error" as const,
    },
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (trimmedCmd === "clear") {
      setHistory([])
      return
    }

    if (trimmedCmd.startsWith("cat ")) {
      const filename = trimmedCmd.split(" ")[1]
      if (filename === "projects.md") {
        setHistory((prev) => [
          ...prev,
          {
            command: cmd,
            output: [
              "# Projects Portfolio",
              "",
              "## Care-pulse",
              "A comprehensive health management system with appointment",
              "scheduling, patient records, and billing integration.",
              "",
              "## FinanceMe",
              "E-commerce platform with Stripe integration, inventory",
              "management, and real-time analytics.",
              "",
              "## Space Orrery",
              "3D visualization of orbital objects using NASA's open data.",
              "Winner of 2024 NASA Space Apps Hackathon (Kenya).",
            ],
            type: "success",
          },
        ])
        return
      }
    }

    const commandData = commands[trimmedCmd as keyof typeof commands]

    if (commandData) {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: commandData.output,
          type: commandData.type,
        },
      ])
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [`Command not found: ${cmd}`, "Type 'help' for available commands"],
          type: "error",
        },
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      executeCommand(input)
      setInput("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    // Welcome message
    setHistory([
      {
        command: "",
        output: [
          "Welcome to Jeff Mutugi's Interactive Terminal!",
          "",
          "Type 'help' to see available commands.",
          "Try 'about', 'skills', 'projects', or 'contact'",
          "",
        ],
        type: "info",
      },
    ])
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="terminal">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimize"></div>
          <div className="terminal-button maximize"></div>
        </div>
        <div className="text-sm font-medium">jeff@portfolio:~</div>
      </div>

      <div ref={terminalRef} className="terminal-content">
        {history.map((entry, index) => (
          <div key={index} className="mb-4">
            {entry.command && (
              <div className="flex items-center mb-1">
                <span className="text-green-400">jeff@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">{currentPath}</span>
                <span className="text-white">$ </span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            <div
              className={`whitespace-pre-line ${
                entry.type === "error" ? "text-red-400" : entry.type === "success" ? "text-green-400" : "text-gray-300"
              }`}
            >
              {entry.output.join("\n")}
            </div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400">jeff@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">{currentPath}</span>
          <span className="text-white">$ </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none ml-1"
            autoFocus
          />
        </form>
      </div>
    </motion.div>
  )
}
