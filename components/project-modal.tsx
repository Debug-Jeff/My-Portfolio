"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Github, ExternalLink } from "lucide-react"
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

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-background border rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10" onClick={onClose}>
              <X size={20} />
            </Button>

            <div className="relative h-64 md:h-80">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h2>

              <p className="text-muted-foreground mb-6">{project.details}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={18} className="mr-2" />
                    View Code
                  </a>
                </Button>
                {project.demo && (
                  <Button variant="outline" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} className="mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
