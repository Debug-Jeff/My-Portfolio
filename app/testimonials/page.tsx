"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TestimonialSlider from "@/components/testimonial-slider"

export default function TestimonialsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Project Manager at TechCorp",
      avatar: "/placeholder.svg?height=100&width=100",
      quote:
        "Jeff's work on our health management system was exceptional. His attention to security details while maintaining a user-friendly interface impressed our entire team.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO at StartupX",
      avatar: "/placeholder.svg?height=100&width=100",
      quote:
        "Working with Jeff on our e-commerce platform was a pleasure. His technical skills combined with his understanding of security vulnerabilities made him an invaluable asset to our project.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Lead Developer at WebSolutions",
      avatar: "/placeholder.svg?height=100&width=100",
      quote:
        "Jeff's contributions to our team were outstanding. His ability to identify and fix security issues while implementing new features helped us deliver a robust product on time.",
    },
    {
      id: 4,
      name: "David Kimani",
      role: "Hackathon Judge",
      avatar: "/placeholder.svg?height=100&width=100",
      quote:
        "The Space Orrery project Jeff co-developed was truly innovative. Their approach to visualizing orbital data was creative and technically impressive, worthy of the first place award.",
    },
    {
      id: 5,
      name: "Lisa Wanjiku",
      role: "University Professor",
      avatar: "/placeholder.svg?height=100&width=100",
      quote:
        "Jeff is one of the most dedicated students I've had the pleasure of teaching. His passion for cybersecurity and his willingness to help others make him stand out among his peers.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto py-16 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          Testimonials
        </motion.h1>

        <motion.p
          className="text-lg text-center max-w-2xl mx-auto mb-16 text-muted-foreground"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Here's what people have to say about working with me on various projects and collaborations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TestimonialSlider testimonials={testimonials} />
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
