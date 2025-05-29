"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProjectCard from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"
import TypewriterEffect from "@/components/typewriter-effect"
import ProjectModal from "@/components/project-modal"

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProject, setSelectedProject] = useState<any | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projects = [
    {
      id: 1,
      title: "Care-pulse",
      description: "A comprehensive health management system for hospitals and clinics.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/jeffmutugi/care-pulse",
      demo: "https://care-pulse.vercel.app",
      details:
        "Care-pulse is a comprehensive health management system designed to streamline hospital operations, patient management, and medical record keeping. The system includes features for appointment scheduling, patient records, billing, and inventory management.",
    },
    {
      id: 2,
      title: "FinanceMe",
      description: "E-commerce platform with integrated payment processing and inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["Next.js", "TypeScript", "Stripe", "Prisma"],
      github: "https://github.com/jeffmutugi/finance-me",
      demo: "https://finance-me.vercel.app",
      details:
        "FinanceMe is a full-featured e-commerce platform that allows businesses to sell products online. It includes features for product management, shopping cart, secure checkout with Stripe, order tracking, and inventory management.",
    },
    {
      id: 3,
      title: "Pomodoro Web Timer",
      description: "Productivity tool implementing the Pomodoro technique with customizable settings.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["React", "CSS", "LocalStorage API"],
      github: "https://github.com/jeffmutugi/pomodoro-timer",
      demo: "https://pomodoro-timer-jeff.vercel.app",
      details:
        "A web-based Pomodoro timer application that helps users improve productivity by breaking work into intervals, traditionally 25 minutes in length, separated by short breaks. Features include customizable work/break durations, sound notifications, and task tracking.",
    },
    {
      id: 4,
      title: "Robot Factory Game",
      description: "Interactive browser-based game where players build and battle robots.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["JavaScript", "HTML Canvas", "CSS"],
      github: "https://github.com/jeffmutugi/robot-factory",
      demo: "https://robot-factory-game.vercel.app",
      details:
        "Robot Factory is a browser-based game where players can design, build, and battle robots. The game features a component-based robot building system, various battle arenas, and a progression system.",
    },
    {
      id: 5,
      title: "Ghost Net",
      description: "Network scanning tool inspired by Nmap with visualization capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["Python", "Scapy", "Flask", "D3.js"],
      github: "https://github.com/jeffmutugi/ghost-net",
      demo: null,
      details:
        "Ghost Net is a network scanning tool inspired by Nmap. It provides network discovery, port scanning, service detection, and vulnerability assessment capabilities. The tool includes a web interface with network visualization using D3.js.",
    },
    {
      id: 6,
      title: "Space Orrery",
      description: "NASA Hackathon winning project for tracking orbital objects in space.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["Three.js", "React", "NASA API", "Node.js"],
      github: "https://github.com/jeffmutugi/space-orrery",
      demo: "https://space-orrery.vercel.app",
      details:
        "Space Orrery is a 3D visualization system for tracking orbital objects in space. The project won the 2024 NASA Space Apps Hackathon (Kenya edition). It uses NASA's open data to visualize satellites, space debris, and other objects in Earth's orbit.",
    },
    {
      id: 7,
      title: "Crowd-source",
      description: "Telemedicine app connecting doctors with patients in remote areas.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["React Native", "Firebase", "WebRTC", "Express"],
      github: "https://github.com/jeffmutugi/crowd-source",
      demo: null,
      details:
        "Crowd-source is a telemedicine application that connects doctors with patients in remote areas. The app features video consultations, secure messaging, prescription management, and medical record keeping.",
    },
    {
      id: 8,
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/jeffmutugi/portfolio",
      demo: "https://jeffmutugi.vercel.app",
      details:
        "A personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The website showcases my projects, skills, and experience in an interactive and visually appealing way.",
    },
    {
      id: 9,
      title: "Weather Dashboard",
      description: "Real-time weather information with forecasting and historical data.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
      github: "https://github.com/jeffmutugi/weather-dashboard",
      demo: "https://weather-dashboard-jeff.vercel.app",
      details:
        "A weather dashboard that provides real-time weather information, forecasting, and historical data. The application uses the OpenWeather API to fetch weather data and Chart.js to visualize temperature, humidity, and precipitation trends.",
    },
    {
      id: 10,
      title: "Task Manager",
      description: "Collaborative task management application with real-time updates.",
      image: "/placeholder.svg?height=400&width=600",
      stack: ["Vue.js", "Firebase", "Vuex", "Tailwind CSS"],
      github: "https://github.com/jeffmutugi/task-manager",
      demo: "https://task-manager-jeff.vercel.app",
      details:
        "A collaborative task management application with real-time updates. The application allows users to create, assign, and track tasks. Features include task categorization, due dates, priority levels, and team collaboration.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-0"
          >
            <TypewriterEffect text="Welcome to My Projects" />
          </motion.div>

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <span className="text-sm text-muted-foreground">View:</span>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={18} />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List size={18} />
            </Button>
          </motion.div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ y: 50, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} viewMode="grid" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ x: -50, opacity: 0 }}
                animate={isVisible ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} viewMode="list" />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}
