"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface ProjectCardProps {
  project: Project
  onClick: () => void
  viewMode: "grid" | "list"
}

export default function ProjectCard({ project, onClick, viewMode }: ProjectCardProps) {
  if (viewMode === "list") {
    return (
      <motion.div
        className="bg-card border rounded-lg shadow-sm overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative h-48 md:h-auto">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>
          <div className="md:w-2/3 p-6">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.stack.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github size={16} className="mr-1" />
                  Code
                </a>
              </Button>
              {project.demo && (
                <Button size="sm" asChild>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-1" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="bg-card border rounded-lg shadow-sm overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.stack.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{project.stack.length - 3}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Github size={14} className="mr-1" />
              Code
            </a>
          </Button>
          {project.demo && (
            <Button size="sm" asChild>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <ExternalLink size={14} className="mr-1" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
