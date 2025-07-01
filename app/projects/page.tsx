"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import dynamic from "next/dynamic"
import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"

// Lazy load components for better performance
const Navbar = dynamic(() => import("@/components/navbar"), {
  loading: () => <div className="h-16 bg-background border-b animate-pulse" />
})
const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-32 bg-background border-t animate-pulse" />
})
const ProjectCard = dynamic(() => import("@/components/project-card"), {
  loading: () => <div className="bg-card border rounded-lg h-64 animate-pulse" />
})
const TypewriterEffect = dynamic(() => import("@/components/typewriter-effect"), {
  loading: () => <div className="h-12 bg-muted animate-pulse rounded" />
})
const ProjectModal = dynamic(() => import("@/components/project-modal"), {
  ssr: false
})

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
      stack: ["React", "Node.js", "PostGres"],
      github: "https://github.com/Debug-Jeff/Carepulse",
      demo: "https://care-pulse.vercel.app",
      details:
        "Care-pulse is a comprehensive health management system designed to streamline hospital operations, patient management, and medical record keeping.",
    },
    {
      id: 2,
      title: "HopeBites",
      description: "Nutritional e-commerce platform specializing in fortified children's snacks with health tracking and subscription services.",
      image: "/hope-bites.png?height=400&width=600",
      stack: ["Vanilla js", "Express", "MongoDB", "Stripe", "Chart.js"],
      github: "https://github.com/hopebites/hopebites-platform",
      demo: "https://hope-bites.vercel.app/",
      details: "HopeBites is a specialized e-commerce platform focused on providing nutritious snacks for children's healthy development. The platform features age-appropriate product filtering, nutritional tracking dashboards for parents, subscription-based delivery services, and educational content about child nutrition."
    },
    {
      id: 3,
      title: "Pomodoro Web App",
      description: "Productivity tool implementing the Pomodoro technique with customizable settings.",
      image: "/pomodoro.png?height=400&width=600",
      stack: ["Vanilla js", "CSS"],
      github: "https://github.com/Debug-Jeff/pomodoro",
      demo: "https://pomodoro-inky-two.vercel.app/",
      details:
        "A web-based Pomodoro timer application that helps users improve productivity by breaking work into intervals, traditionally 25 minutes in length, separated by short breaks. Features include customizable work/break durations, sound notifications, and task tracking.",
    },
    {
      id: 4,
      title: "Robot Factory Game",
      description: "Interactive browser-based game where players build and battle robots.",
      image: "/bots.png?height=400&width=600",
      stack: ["JavaScript", "HTML Canvas", "CSS"],
      github: "https://github.com/Debug-Jeff/exo-brawl",
      demo: "https://robot-factory.netlify.app/",
      details:
        "Robot Factory is a browser-based game where players can design, build, and battle robots. The game features a component-based robot building system, various battle arenas, and a progression system.",
    },
    {
      id: 5,
      title: "Ghost Net",
      description: "Network scanning tool inspired by Nmap with visualization capabilities.",
      image: "/ghostnet.png?height=400&width=600",
      stack: ["Python", "Scapy"],
      github: "https://github.com/Debug-Jeff/GhostNet",
      demo: null,
      details:
        "Ghost Net is a network scanning tool inspired by Nmap. It provides network discovery, port scanning, service detection, and vulnerability assessment capabilities.",
    },
    {
      id: 6,
      title: "Space Orrery",
      description: "NASA Hackathon winning project for tracking orbital objects in space.",
      image: "/orrery-web-app.png?height=400&width=600",
      stack: ["Three.js", "Next.js", "NASA API", "Node.js"],
      github: "https://github.com/Debug-Jeff/spaceapp",
      demo: "https://spaceapp-self.vercel.app/",
      details:
        "Space Orrery is a 3D visualization system for tracking orbital objects in space. The project won the 2024 NASA Space Apps Hackathon (Kenya edition). It uses NASA's open data to visualize satellites, space debris, and other objects in Earth's orbit.",
    },
    {
      id: 7,
      title: "Crowd-source",
      description: "Telemedicine app connecting doctors with patients in remote areas.",
      image: "/crowd-source.png?height=400&width=600",
      stack: ["React", "Firebase", "WebRTC", "Express"],
      github: "https://github.com/Debug-Jeff/crowd_src",
      demo: "https://crowd-source-xi.vercel.app/",
      details:
        "Crowd-source is a telemedicine application that connects doctors with patients in remote areas. The app features video consultations, secure messaging, prescription management, and medical record keeping.",
    },
    {
      id: 8,
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills.",
      image: "/home.png?height=400&width=600",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/Debug-Jeff/My-Portfolio",
      demo: "https://the-odessy-portfolio.netlify.app/",
      details:
        "A personal portfolio website. The website showcases my projects, skills, and experience in an interactive and visually appealing way.{🙂} You are looking at it!",
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
  ], [])

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-16 bg-background border-b animate-pulse" />}>
        <Navbar />
      </Suspense>
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <Suspense fallback={<span>My Projects</span>}>
              <TypewriterEffect text="My Projects" />
            </Suspense>
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl">
            Here are some of my notable projects. Each one represents a unique challenge and learning experience.
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              aria-label="List view"
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
              <Suspense fallback={<div className="bg-card border rounded-lg h-64 animate-pulse" />}>
                <ProjectCard
                  project={project}
                  viewMode={viewMode}
                  onClick={() => setSelectedProject(project)}
                />
              </Suspense>
            </div>
          ))}
        </div>
      </main>

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}

      <Suspense fallback={<div className="h-32 bg-background border-t animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  )
}