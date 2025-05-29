"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Timeline, TimelineItem } from "@/components/timeline"
import AchievementsTimeline from "@/components/achievements-timeline"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const quickFacts = [
    { label: "Age", value: "20" },
    { label: "Nationality", value: "Kenyan" },
    { label: "Location", value: "Nairobi, Kenya" },
    { label: "Languages", value: "English, Swahili" },
    { label: "Interests", value: "Gaming, Reading, Hiking, Cycling" },
    { label: "Education", value: "Computer Science" },
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
          About Me
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          <motion.div
            className="w-full md:w-1/3 flex justify-center"
            initial={{ x: -100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <svg
                className="absolute w-full h-full text-primary animate-[spin_20s_linear_infinite]"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0ZM50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <circle cx="50" cy="10" r="8" fill="currentColor" />
              </svg>
              <div className="absolute inset-4 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=300" alt="Jeff Mutugi" fill className="object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-2/3"
            initial={{ x: 100, opacity: 0 }}
            animate={isVisible ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                I'm Jeff Mutugi, a 20-year-old Computer Science student at Africa Nazarene University (2024–2027),
                currently specializing in Cybersecurity with a strong inclination toward Offensive Security and ethical
                hacking. My educational journey began at The Pinnacle School (2009–2019), followed by Murang'a High
                School (2020–2023), where I cultivated my analytical mindset and deep curiosity for technology. Today, I
                combine my academic grounding with hands-on experience in both cybersecurity and full-stack web
                development. Proficient in Python, JavaScript, and database languages, I've worked with modern
                technologies such as React, Next.js, Tailwind CSS, Django, and Express.js.
              </p>
              <p>
                I've built and contributed to diverse projects—including a Health Management System, an eCommerce web
                app, a web-based Pomodoro timer, a dynamic game (Robot-Factory), and a network scanner (Ghost Net)
                inspired by Nmap. Notably, I co-developed a space orrery system for tracking orbital objects, which won
                the 2024 NASA Space Apps Hackathon (Kenya edition), and a telemedicine app that connects doctors with
                patients in remote areas.
              </p>
              <p>
                Beyond development, I'm deeply involved in cybersecurity practice—penetrating vulnerable machines,
                competing in national CTFs, and actively learning advanced red teaming techniques. I also serve as an
                official in my university's tech club (Cyberene), and am an engaged member of multiple tech communities
                both nationally and globally. In addition to technical competencies, I bring strong problem-solving
                skills, a collaborative mindset, leadership experience, adaptability, and excellent communication
                skills—honed through team projects, mentorship, and public presentations.
              </p>
              <p>
                I've worked as an IT technician with hands-on networking experience, explored emerging tools like
                Copilot Studio for building custom AI assistants, and frequently contribute to both learning and
                teaching in areas such as JavaScript frameworks and cybersecurity basics. Outside the tech sphere, I'm a
                passionate gamer, an avid reader, a hiking and cycling enthusiast, and a curious mind always eager to
                learn something new. I envision a future as a professional penetration tester and security researcher,
                continuously innovating at the intersection of secure systems and human-centered design.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Education Timeline</h2>

          <Timeline>
            <TimelineItem
              title="Africa Nazarene University"
              date="2024 - 2027"
              description="Computer Science, specializing in Cybersecurity"
            />
            <TimelineItem title="Murang'a High School" date="2020 - 2023" description="Secondary Education" />
            <TimelineItem title="The Pinnacle School" date="2009 - 2019" description="Primary Education" />
          </Timeline>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Quick Facts</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {quickFacts.map((fact, index) => (
              <motion.div
                key={index}
                className="bg-card border rounded-lg p-4 text-center shadow-sm"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-medium text-muted-foreground mb-2">{fact.label}</h3>
                <p className="text-xl font-semibold">{fact.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <AchievementsTimeline />
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
