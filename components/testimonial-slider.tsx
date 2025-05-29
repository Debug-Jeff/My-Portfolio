"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: number
  name: string
  role: string
  avatar: string
  quote: string
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-card border rounded-lg p-8 shadow-sm min-h-[300px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full"
          >
            <div className="flex justify-center mb-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <blockquote className="text-lg md:text-xl italic mb-6 text-muted-foreground">
              "{testimonials[currentIndex].quote}"
            </blockquote>

            <div>
              <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
              <p className="text-primary">{testimonials[currentIndex].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        <Button variant="outline" size="icon" onClick={prevTestimonial}>
          <ChevronLeft size={20} />
        </Button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <Button variant="outline" size="icon" onClick={nextTestimonial}>
          <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  )
}
