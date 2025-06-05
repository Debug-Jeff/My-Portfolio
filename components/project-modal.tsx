"use client"

import { useEffect, useCallback } from "react"
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

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const contentVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose()
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)
    
    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-background border rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 z-10" 
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </Button>

            <div className="relative h-64 md:h-80">
              <Image
                src={project.image || "/image-1.jpg"}
                alt={project.title}
                fill
                className="object-cover rounded-t-lg"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={false}
              />
            </div>

            <div className="p-6">
              <h2 id="modal-title" className="text-2xl md:text-3xl font-bold mb-4">{project.title}</h2>

              <p className="text-muted-foreground mb-6">{project.details}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button asChild>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={18} className="mr-2" />
                    View Code
                  </a>
                </Button>
                {project.demo && (
                  <Button variant="outline" asChild>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
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
