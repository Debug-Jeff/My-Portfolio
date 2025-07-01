"use client"

import { memo, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

// Lazy load Image component for better performance
const Image = dynamic(() => import("next/image"), {
  loading: () => <div className="w-full h-48 bg-muted animate-pulse rounded-t-lg" />
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

interface ProjectCardProps {
  project: Project
  onClick: () => void
  viewMode: "grid" | "list"
}

function ProjectCard({ project, onClick, viewMode }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  if (viewMode === "list") {
    return (
      <div
        className="bg-card border rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-transform hover:scale-102"
        onClick={onClick}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 relative h-48 md:h-auto">
            <Suspense fallback={<div className="w-full h-full bg-muted animate-pulse" />}>
              <Image
                src={project.image || "/image-1.jpg"}
                alt={project.title}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </Suspense>
            {imageError && (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Image unavailable</span>
              </div>
            )}
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
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={16} className="mr-1" />
                  Code
                </a>
              </Button>
              {project.demo && (
                <Button size="sm" asChild>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-card border rounded-lg shadow-sm overflow-hidden cursor-pointer group transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <Suspense fallback={<div className="w-full h-full bg-muted animate-pulse" />}>
          <Image
            src={project.image || "/image-1.jpg"}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Suspense>
        {imageError && (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Image unavailable</span>
          </div>
        )}
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
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} className="mr-1" />
              Code
            </a>
          </Button>
          {project.demo && (
            <Button size="sm" asChild>
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} className="mr-1" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(ProjectCard)