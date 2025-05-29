"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface TimelineProps {
  children: ReactNode
}

interface TimelineItemProps {
  title: string
  date: string
  description: string
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-border"></div>
      <div className="space-y-8">{children}</div>
    </div>
  )
}

export function TimelineItem({ title, date, description }: TimelineItemProps) {
  return (
    <motion.div
      className="relative flex items-center"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

      <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8 md:text-right md:even:ml-auto md:even:pl-8 md:even:pr-0 md:even:text-left">
        <motion.div
          className="bg-card border rounded-lg p-4 shadow-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-primary mb-2">{date}</p>
          <p className="text-muted-foreground">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
