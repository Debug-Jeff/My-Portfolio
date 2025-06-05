"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import dynamic from "next/dynamic"
import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

const Navbar = dynamic(() => import("@/components/navbar"))
const Footer = dynamic(() => import("@/components/footer"))
const ProjectCard = dynamic(() => import("@/components/project-card"))
const TypewriterEffect = dynamic(() => import("@/components/typewriter-effect"))
const ProjectModal = dynamic(() => import("@/components/project-modal"))

interface Project {
  id: number
  title: string
  description: string
  image: string
  stack: string[]
  github: string
  demo: string | null
  details: string
}

export default function ProjectsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      setIsVisible(true)
    }
  }, [inView])

  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: "Care-pulse",
      description: "A comprehensive health management system for hospitals and clinics.",
      image: "/carepulse.jpg?height=400&width=600",
      stack: ["React", "Node.js", "PostGres", "Express"],
      github: "https://github.com/Debug-Jeff/v0-carepulse",
      demo: "https://care-pulse.vercel.app",
      details:
        "Care-pulse is a comprehensive health management system designed to streamline hospital operations, patient management, and medical record keeping. The system includes features for appointment scheduling, patient records, billing, and inventory management.",
    },
    {
      id: 2,
      title: "HopeBites",
      description: "Nutritional e-commerce platform specializing in fortified children's snacks with health tracking and subscription services.",
      image: "/hope-bites.png?height=400&width=600",
      stack: ["React", "Node.js", "MongoDB", "Stripe", "Chart.js"],
      github: "https://github.com/hopebites/hopebites-platform",
      demo: "https://hopebites.com",
      details: "HopeBites is a specialized e-commerce platform focused on providing nutritious snacks for children's healthy development. The platform features age-appropriate product filtering, nutritional tracking dashboards for parents, subscription-based delivery services, and educational content about child nutrition. It includes advanced features like personalized nutrition recommendations, growth tracking integration, pediatric nutritionist consultations, and a rewards program that encourages healthy eating habits in children."
    },
    {
      id: 3,
      title: "Pomodoro Web Timer",
      description: "Productivity tool implementing the Pomodoro technique with customizable settings.",
      image: "/pomodoro.jpg?height=400&width=600",
      stack: ["React", "CSS", "LocalStorage API"],
      github: "https://github.com/Debug-Jeff/pomodoro",
      demo: "https://pomodoro-timer-jeff.vercel.app",
      details:
        "A web-based Pomodoro timer application that helps users improve productivity by breaking work into intervals, traditionally 25 minutes in length, separated by short breaks. Features include customizable work/break durations, sound notifications, and task tracking.",
    },
    {
      id: 4,
      title: "Robot Factory Game",
      description: "Interactive browser-based game where players build and battle robots.",
      image: "/image-1.jpg?height=400&width=600",
      stack: ["JavaScript", "HTML Canvas", "CSS"],
      github: "https://github.com/Debug-Jeff/robot-factory",
      demo: "https://robot-factory-game.vercel.app",
      details:
        "Robot Factory is a browser-based game where players can design, build, and battle robots. The game features a component-based robot building system, various battle arenas, and a progression system.",
    },
    {
      id: 5,
      title: "Ghost Net",
      description: "Network scanning tool inspired by Nmap with visualization capabilities.",
      image: "/ghost-net.png?height=400&width=600",
      stack: ["Python", "Scapy", "Flask", "D3.js"],
      github: "https://github.com/Debug-Jeff/GhostNet",
      demo: null,
      details:
        "Ghost Net is a network scanning tool inspired by Nmap. It provides network discovery, port scanning, service detection, and vulnerability assessment capabilities. The tool includes a web interface with network visualization using D3.js.",
    },
    {
      id: 6,
      title: "Space Orrery",
      description: "NASA Hackathon winning project for tracking orbital objects in space.",
      image: "/orrery-web-app.png?height=400&width=600",
      stack: ["Three.js", "React", "NASA API", "Node.js"],
      github: "https://github.com/jeffmutugi/space-orrery",
      demo: "https://spaceapp-self.vercel.app/",
      details:
        "Space Orrery is a 3D visualization system for tracking orbital objects in space. The project won the 2024 NASA Space Apps Hackathon (Kenya edition). It uses NASA's open data to visualize satellites, space debris, and other objects in Earth's orbit.",
    },
    {
      id: 7,
      title: "Crowd-source",
      description: "Telemedicine app connecting doctors with patients in remote areas.",
      image: "/image-1.jpg?height=400&width=600",
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
      image: "/image-1.jpg?height=400&width=600",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/Debug-Jeff/My-Portfolio",
      demo: "https://jeffmutugi.vercel.app",
      details:
        "A personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The website showcases my projects, skills, and experience in an interactive and visually appealing way.",
    },
    {
      id: 9,
      title: "Weather Dashboard",
      description: "Real-time weather information with forecasting and historical data.",
      image: "/weather-dashboard-2.png?height=400&width=600",
      stack: ["Nextjs", "OpenWeather API", "Chart.js", "Tailwind CSS"],
      github: "https://github.com/Debug-Jeff/weather-dashboard",
      demo: "https://weather-dashboard-tau-lemon.vercel.app/",
      details:
        "A weather dashboard that provides real-time weather information, forecasting, and historical data. The application uses the OpenWeather API to fetch weather data and Chart.js to visualize temperature, humidity, and precipitation trends.",
    },
    {
      id: 10,
      title: "Task Manager",
      description: "Collaborative task management application with real-time updates.",
      image: "/image-1.jpg?height=400&width=600",
      stack: ["Vue.js", "Firebase", "Vuex", "Tailwind CSS"],
      github: "https://github.com/jeffmutugi/task-manager",
      demo: "https://task-manager-jeff.vercel.app",
      details:
        "A collaborative task management application with real-time updates. The application allows users to create, assign, and track tasks. Features include task categorization, due dates, priority levels, and team collaboration.",
    },
  ], [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <TypewriterEffect text="My Projects" />
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl">
            Here are some of my notable projects. Each one represents a unique challenge and learning experience.
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={ref}
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`transform transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
              style={{ transitionDelay: `${project.id * 100}ms` }}
            >
              <ProjectCard
                project={project}
                viewMode={viewMode}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </main>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <Footer />
    </div>
  )
}
