"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Github,
  Star,
  GitFork,
  Users,
  Calendar,
  Code,
  Plus,
  Heart,
  MessageSquare,
  Zap,
  Shield,
  Globe,
  Database,
  Smartphone,
} from "lucide-react"

const collaborationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  github: z.string().optional(),
  skills: z.string().min(10, "Please describe your skills"),
  interest: z.string().min(20, "Please explain your interest in the project"),
  availability: z.string().min(5, "Please specify your availability"),
})

type CollaborationForm = z.infer<typeof collaborationSchema>

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  type: "Open Source" | "Community" | "Research" | "Startup"
  status: "Planning" | "Active" | "Seeking Contributors" | "Completed"
  contributors: number
  stars: number
  forks: number
  lastUpdate: string
  githubUrl: string
  icon: React.ReactNode
  color: string
  lookingFor: string[]
  timeline: string
}

export default function CollaborationBoard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CollaborationForm>({
    resolver: zodResolver(collaborationSchema),
    defaultValues: {
      name: "",
      email: "",
      github: "",
      skills: "",
      interest: "",
      availability: "",
    },
  })

  useEffect(() => {
    // Mock projects data
    setProjects([
      {
        id: "1",
        title: "SecureChat Pro",
        description:
          "End-to-end encrypted messaging platform with advanced security features and zero-knowledge architecture.",
        technologies: ["React", "Node.js", "WebRTC", "Cryptography", "PostgreSQL"],
        difficulty: "Advanced",
        type: "Open Source",
        status: "Seeking Contributors",
        contributors: 8,
        stars: 234,
        forks: 45,
        lastUpdate: "2 days ago",
        githubUrl: "https://github.com/jeffmutugi/securechat-pro",
        icon: <Shield className="w-6 h-6" />,
        color: "bg-red-500",
        lookingFor: ["Security Experts", "Frontend Developers", "Cryptography Specialists"],
        timeline: "6 months",
      },
      {
        id: "2",
        title: "DevTools Dashboard",
        description:
          "Comprehensive developer productivity dashboard with project management, code analytics, and team collaboration features.",
        technologies: ["Next.js", "TypeScript", "Prisma", "tRPC", "Tailwind"],
        difficulty: "Intermediate",
        type: "Community",
        status: "Active",
        contributors: 12,
        stars: 567,
        forks: 89,
        lastUpdate: "1 day ago",
        githubUrl: "https://github.com/jeffmutugi/devtools-dashboard",
        icon: <Code className="w-6 h-6" />,
        color: "bg-blue-500",
        lookingFor: ["Full-stack Developers", "UI/UX Designers", "DevOps Engineers"],
        timeline: "4 months",
      },
      {
        id: "3",
        title: "AI Security Scanner",
        description:
          "Machine learning-powered vulnerability scanner that automatically detects security issues in web applications.",
        technologies: ["Python", "TensorFlow", "FastAPI", "Docker", "Redis"],
        difficulty: "Advanced",
        type: "Research",
        status: "Planning",
        contributors: 3,
        stars: 123,
        forks: 23,
        lastUpdate: "1 week ago",
        githubUrl: "https://github.com/jeffmutugi/ai-security-scanner",
        icon: <Zap className="w-6 h-6" />,
        color: "bg-purple-500",
        lookingFor: ["ML Engineers", "Security Researchers", "Python Developers"],
        timeline: "8 months",
      },
      {
        id: "4",
        title: "EcoTrack Mobile",
        description: "Mobile app for tracking personal carbon footprint with gamification and community challenges.",
        technologies: ["React Native", "Expo", "Firebase", "Node.js", "MongoDB"],
        difficulty: "Beginner",
        type: "Startup",
        status: "Seeking Contributors",
        contributors: 5,
        stars: 89,
        forks: 12,
        lastUpdate: "3 days ago",
        githubUrl: "https://github.com/jeffmutugi/ecotrack-mobile",
        icon: <Smartphone className="w-6 h-6" />,
        color: "bg-green-500",
        lookingFor: ["Mobile Developers", "UI/UX Designers", "Backend Developers"],
        timeline: "3 months",
      },
      {
        id: "5",
        title: "OpenAPI Generator",
        description:
          "Tool for automatically generating comprehensive API documentation and client SDKs from OpenAPI specifications.",
        technologies: ["Go", "OpenAPI", "Docker", "GitHub Actions", "Swagger"],
        difficulty: "Intermediate",
        type: "Open Source",
        status: "Active",
        contributors: 15,
        stars: 445,
        forks: 67,
        lastUpdate: "5 hours ago",
        githubUrl: "https://github.com/jeffmutugi/openapi-generator",
        icon: <Database className="w-6 h-6" />,
        color: "bg-orange-500",
        lookingFor: ["Go Developers", "Technical Writers", "DevOps Engineers"],
        timeline: "5 months",
      },
      {
        id: "6",
        title: "Portfolio Builder",
        description:
          "No-code platform for developers to create stunning portfolio websites with built-in analytics and SEO optimization.",
        technologies: ["Next.js", "Prisma", "Stripe", "Vercel", "Tailwind"],
        difficulty: "Intermediate",
        type: "Community",
        status: "Planning",
        contributors: 2,
        stars: 78,
        forks: 15,
        lastUpdate: "1 week ago",
        githubUrl: "https://github.com/jeffmutugi/portfolio-builder",
        icon: <Globe className="w-6 h-6" />,
        color: "bg-indigo-500",
        lookingFor: ["Frontend Developers", "Backend Developers", "Product Designers"],
        timeline: "6 months",
      },
    ])
  }, [])

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true
    if (filter === "seeking") return project.status === "Seeking Contributors"
    if (filter === "active") return project.status === "Active"
    if (filter === "planning") return project.status === "Planning"
    return project.type.toLowerCase() === filter
  })

  const onSubmit = async (data: CollaborationForm) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Collaboration request:", { ...data, projectId: selectedProject?.id })
      form.reset()
      setSelectedProject(null)
    } catch (error) {
      console.error("Error submitting collaboration request:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Seeking Contributors":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    // <div className="max-w-7xl mx-auto p-6">
    //   <div className="text-center mb-12">
    //     <h1 className="text-4xl font-bold mb-4">Collaboration Board</h1>
    //     <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
    //       Join me in building amazing open source projects! Whether you're a beginner looking to learn or an expert
    //       wanting to contribute, there's a place for you here.
    //     </p>
    //   </div>

    //   {/* Filters */}
    //   <div className="flex flex-wrap gap-2 mb-8 justify-center">
    //     {[
    //       { key: "all", label: "All Projects" },
    //       { key: "seeking", label: "Seeking Contributors" },
    //       { key: "active", label: "Active" },
    //       { key: "planning", label: "Planning" },
    //       { key: "open source", label: "Open Source" },
    //       { key: "community", label: "Community" },
    //       { key: "research", label: "Research" },
    //       { key: "startup", label: "Startup" },
    //     ].map((filterOption) => (
    //       <Button
    //         key={filterOption.key}
    //         variant={filter === filterOption.key ? "default" : "outline"}
    //         size="sm"
    //         onClick={() => setFilter(filterOption.key)}
    //       >
    //         {filterOption.label}
    //       </Button>
    //     ))}
    //   </div>

    //   {/* Projects Grid */}
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {filteredProjects.map((project, index) => (
    //       <motion.div
    //         key={project.id}
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ delay: index * 0.1 }}
    //       >
    //         <Card className="h-full hover:shadow-lg transition-shadow">
    //           <CardHeader>
    //             <div className="flex items-start justify-between">
    //               <div className={`p-2 rounded-lg ${project.color} text-white`}>{project.icon}</div>
    //               <div className="flex gap-2">
    //                 <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
    //                 <Badge className={getDifficultyColor(project.difficulty)}>{project.difficulty}</Badge>
    //               </div>
    //             </div>
    //             <CardTitle className="text-xl">{project.title}</CardTitle>
    //             <CardDescription className="line-clamp-3">{project.description}</CardDescription>
    //           </CardHeader>

    //           <CardContent className="space-y-4">
    //             {/* Technologies */}
    //             <div className="flex flex-wrap gap-1">
    //               {project.technologies.slice(0, 3).map((tech) => (
    //                 <Badge key={tech} variant="secondary" className="text-xs">
    //                   {tech}
    //                 </Badge>
    //               ))}
    //               {project.technologies.length > 3 && (
    //                 <Badge variant="secondary" className="text-xs">
    //                   +{project.technologies.length - 3}
    //                 </Badge>
    //               )}
    //             </div>

    //             {/* Stats */}
    //             <div className="flex items-center gap-4 text-sm text-muted-foreground">
    //               <div className="flex items-center gap-1">
    //                 <Star className="w-4 h-4" />
    //                 {project.stars}
    //               </div>
    //               <div className="flex items-center gap-1">
    //                 <GitFork className="w-4 h-4" />
    //                 {project.forks}
    //               </div>
    //               <div className="flex items-center gap-1">
    //                 <Users className="w-4 h-4" />
    //                 {project.contributors}
    //               </div>
    //             </div>

    //             {/* Looking For */}
    //             <div>
    //               <p className="text-sm font-medium mb-2">Looking for:</p>
    //               <div className="flex flex-wrap gap-1">
    //                 {project.lookingFor.slice(0, 2).map((role) => (
    //                   <Badge key={role} variant="outline" className="text-xs">
    //                     {role}
    //                   </Badge>
    //                 ))}
    //                 {project.lookingFor.length > 2 && (
    //                   <Badge variant="outline" className="text-xs">
    //                     +{project.lookingFor.length - 2}
    //                   </Badge>
    //                 )}
    //               </div>
    //             </div>

    //             {/* Timeline */}
    //             <div className="flex items-center gap-2 text-sm text-muted-foreground">
    //               <Calendar className="w-4 h-4" />
    //               <span>Timeline: {project.timeline}</span>
    //             </div>

    //             {/* Actions */}
    //             <div className="flex gap-2 pt-2">
    //               <Dialog>
    //                 <DialogTrigger asChild>
    //                   <Button size="sm" className="flex-1" onClick={() => setSelectedProject(project)}>
    //                     <Heart className="w-4 h-4 mr-2" />
    //                     Join Project
    //                   </Button>
    //                 </DialogTrigger>
    //                 <DialogContent className="max-w-md">
    //                   <DialogHeader>
    //                     <DialogTitle>Join {project.title}</DialogTitle>
    //                     <DialogDescription>
    //                       Tell me about yourself and why you'd like to contribute to this project.
    //                     </DialogDescription>
    //                   </DialogHeader>

    //                   <Form {...form}>
    //                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //                       <FormField
    //                         control={form.control}
    //                         name="name"
    //                         render={({ field }) => (
    //                           <FormItem>
    //                             <FormLabel>Name</FormLabel>
    //                             <FormControl>
    //                               <Input placeholder="Your full name" {...field} />
    //                             </FormControl>
    //                             <FormMessage />
    //                           </FormItem>
    //                         )}
    //                       />

    //                       <FormField
    //                         control={form.control}
    //                         name="email"
    //                         render={({ field }) => (
    //                           <FormItem>
    //                             <FormLabel>Email</FormLabel>
    //                             <FormControl>
    //                               <Input placeholder="your.email@example.com" {...field} />
    //                             </FormControl>
    //                             <FormMessage />
    //                           </FormItem>
    //                         )}
    //                       />

    //                       <FormField
    //                         control={form.control}
    //                         name="github"
    //                         render={({ field }) => (
    //                           <FormItem>
    //                             <FormLabel>GitHub Username (Optional)</FormLabel>
    //                             <FormControl>
    //                               <Input placeholder="your-github-username" {...field} />
    //                             </FormControl>
    //                             <FormMessage />
    //                           </FormItem>
    //                         )}
    //                       />

    //                       <FormField
    //                         control={form.control}
    //                         name="skills"
    //                         render={({ field }) => (
    //                           <FormItem>
    //                             <FormLabel>Your Skills</FormLabel>
    //                             <FormControl>
    //                               <Textarea placeholder="Describe your relevant skills and experience..." {...field} />
    //                             </FormControl>
    //                             <FormMessage />
    //                           </FormItem>
    //                         )}
    //                       />

    //                       <FormField
    //                         control={form.control}
    //                         name="interest"
    //                         render={({ field }) => (
    //                           <FormItem>
    //                             <FormLabel>Why This Project?</FormLabel>
    //                             <FormControl>
    //                               <Textarea
    //                                 placeholder="What interests you about this project? How would you like to contribute?"
    //                                 {...field}
    //                               />
    //                             </FormControl>
    //                             <FormMessage />
    //                           </FormItem>
    //                         )}
    //                       />

    //                       <FormField
    //                         control={form.control}
    //                         name="availability"
    //                         render={({ field }) => (
    //                           <FormItem>
    //                             <FormLabel>Availability</FormLabel>
    //                             <FormControl>
    //                               <Input placeholder="e.g., 10 hours/week, weekends only, etc." {...field} />
    //                             </FormControl>
    //                             <FormMessage />
    //                           </FormItem>
    //                         )}
    //                       />

    //                       <Button type="submit" className="w-full" disabled={isSubmitting}>
    //                         {isSubmitting ? "Submitting..." : "Submit Application"}
    //                       </Button>
    //                     </form>
    //                   </Form>
    //                 </DialogContent>
    //               </Dialog>

    //               <Button variant="outline" size="sm" asChild>
    //                 <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
    //                   <Github className="w-4 h-4 mr-2" />
    //                   GitHub
    //                 </a>
    //               </Button>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </motion.div>
    //     ))}
    //   </div>

    //   {/* Call to Action */}
    //   <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ delay: 0.5 }}
    //     className="mt-16 text-center"
    //   >
    //     <Card className="max-w-2xl mx-auto">
    //       <CardHeader>
    //         <CardTitle className="flex items-center justify-center gap-2">
    //           <Plus className="w-6 h-6" />
    //           Have a Project Idea?
    //         </CardTitle>
    //         <CardDescription>Want to start a new collaboration or suggest a project? Let's discuss it!</CardDescription>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="flex flex-col sm:flex-row gap-4 justify-center">
    //           <Button asChild>
    //             <a href="/contact">
    //               <MessageSquare className="w-4 h-4 mr-2" />
    //               Propose a Project
    //             </a>
    //           </Button>
    //           <Button variant="outline" asChild>
    //             <a href="https://github.com/jeffmutugi" target="_blank" rel="noopener noreferrer">
    //               <Github className="w-4 h-4 mr-2" />
    //               View All Repositories
    //             </a>
    //           </Button>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </motion.div>
    // </div>
  )
}
