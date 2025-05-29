"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Shield,
  Zap,
  Star,
  Trophy,
  CheckCircle,
  Lock,
  Unlock,
} from "lucide-react"

interface CVSection {
  id: string
  title: string
  icon: React.ReactNode
  unlocked: boolean
  progress: number
  content: React.ReactNode
}

export default function InteractiveCV() {
  const [currentSection, setCurrentSection] = useState("personal")
  const [unlockedSections, setUnlockedSections] = useState(new Set(["personal"]))
  const [gameProgress, setGameProgress] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])

  const unlockSection = (sectionId: string) => {
    if (!unlockedSections.has(sectionId)) {
      setUnlockedSections((prev) => new Set([...prev, sectionId]))
      setGameProgress((prev) => prev + 20)
      setAchievements((prev) => [...prev, `Unlocked ${sectionId} section!`])
    }
  }

  const cvSections: CVSection[] = [
    {
      id: "personal",
      title: "Personal Info",
      icon: <MapPin className="w-5 h-5" />,
      unlocked: true,
      progress: 100,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              JM
            </div>
            <h2 className="text-2xl font-bold">Jeff Mutugi</h2>
            <p className="text-muted-foreground">Cybersecurity Specialist & Full-stack Developer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span>jeff.mutugi@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-green-500" />
              <span>+254 700 123 456</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" />
              <span>jeffmutugi.dev</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="sm">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      title: "Experience",
      icon: <Briefcase className="w-5 h-5" />,
      unlocked: unlockedSections.has("experience"),
      progress: unlockedSections.has("experience") ? 100 : 0,
      content: (
        <div className="space-y-6">
          {[
            {
              title: "Senior Cybersecurity Analyst",
              company: "SecureTech Solutions",
              period: "2022 - Present",
              description: "Lead security assessments and penetration testing for enterprise clients.",
              achievements: ["Reduced security incidents by 40%", "Led team of 5 security analysts"],
            },
            {
              title: "Full-stack Developer",
              company: "TechCorp Kenya",
              period: "2020 - 2022",
              description: "Developed scalable web applications using React, Node.js, and cloud technologies.",
              achievements: ["Built 15+ production applications", "Improved performance by 60%"],
            },
            {
              title: "Junior Developer",
              company: "StartupHub",
              period: "2019 - 2020",
              description: "Contributed to various startup projects and learned modern development practices.",
              achievements: ["Shipped 8 successful projects", "Mentored 3 junior developers"],
            },
          ].map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="border-l-2 border-blue-500 pl-4"
            >
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-blue-600 font-medium">{job.company}</p>
              <p className="text-sm text-muted-foreground mb-2">{job.period}</p>
              <p className="mb-2">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {job.achievements.map((achievement, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: "skills",
      title: "Skills",
      icon: <Code className="w-5 h-5" />,
      unlocked: unlockedSections.has("skills"),
      progress: unlockedSections.has("skills") ? 100 : 0,
      content: (
        <div className="space-y-6">
          {[
            {
              category: "Programming Languages",
              skills: [
                { name: "TypeScript", level: 95 },
                { name: "Python", level: 90 },
                { name: "JavaScript", level: 92 },
                { name: "Go", level: 75 },
                { name: "Rust", level: 65 },
              ],
            },
            {
              category: "Cybersecurity",
              skills: [
                { name: "Penetration Testing", level: 90 },
                { name: "Network Security", level: 85 },
                { name: "Incident Response", level: 88 },
                { name: "Risk Assessment", level: 82 },
                { name: "Compliance", level: 78 },
              ],
            },
            {
              category: "Web Development",
              skills: [
                { name: "React/Next.js", level: 95 },
                { name: "Node.js", level: 88 },
                { name: "Database Design", level: 85 },
                { name: "Cloud Platforms", level: 80 },
                { name: "DevOps", level: 75 },
              ],
            },
          ].map((category, index) => (
            <div key={index} className="space-y-3">
              <h3 className="font-semibold text-lg text-blue-600">{category.category}</h3>
              <div className="space-y-2">
                {category.skills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "education",
      title: "Education",
      icon: <GraduationCap className="w-5 h-5" />,
      unlocked: unlockedSections.has("education"),
      progress: unlockedSections.has("education") ? 100 : 0,
      content: (
        <div className="space-y-6">
          {[
            {
              degree: "Master of Science in Cybersecurity",
              institution: "University of Nairobi",
              period: "2020 - 2022",
              gpa: "3.8/4.0",
              achievements: ["Thesis on AI-driven threat detection", "Dean's List 4 semesters"],
            },
            {
              degree: "Bachelor of Science in Computer Science",
              institution: "Kenyatta University",
              period: "2016 - 2020",
              gpa: "3.6/4.0",
              achievements: ["Graduated Magna Cum Laude", "President of CS Society"],
            },
          ].map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
            >
              <h3 className="font-semibold text-lg">{edu.degree}</h3>
              <p className="text-blue-600 font-medium">{edu.institution}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">{edu.period}</span>
                <Badge variant="outline">GPA: {edu.gpa}</Badge>
              </div>
              <div className="mt-3 space-y-1">
                {edu.achievements.map((achievement, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    {achievement}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: "achievements",
      title: "Achievements",
      icon: <Trophy className="w-5 h-5" />,
      unlocked: unlockedSections.has("achievements"),
      progress: unlockedSections.has("achievements") ? 100 : 0,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Certified Ethical Hacker (CEH)",
              issuer: "EC-Council",
              date: "2023",
              icon: <Shield className="w-6 h-6 text-red-500" />,
            },
            {
              title: "AWS Solutions Architect",
              issuer: "Amazon Web Services",
              date: "2022",
              icon: <Zap className="w-6 h-6 text-orange-500" />,
            },
            {
              title: "Top 1% Developer",
              issuer: "Stack Overflow",
              date: "2023",
              icon: <Code className="w-6 h-6 text-green-500" />,
            },
            {
              title: "Cybersecurity Excellence Award",
              issuer: "Kenya ICT Board",
              date: "2023",
              icon: <Award className="w-6 h-6 text-blue-500" />,
            },
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="border rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-3">{achievement.icon}</div>
              <h3 className="font-semibold mb-1">{achievement.title}</h3>
              <p className="text-sm text-blue-600 mb-1">{achievement.issuer}</p>
              <p className="text-xs text-muted-foreground">{achievement.date}</p>
            </motion.div>
          ))}
        </div>
      ),
    },
  ]

  // Game mechanics
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSection === "personal" && !unlockedSections.has("experience")) {
        setTimeout(() => unlockSection("experience"), 3000)
      }
      if (currentSection === "experience" && !unlockedSections.has("skills")) {
        setTimeout(() => unlockSection("skills"), 2000)
      }
      if (currentSection === "skills" && !unlockedSections.has("education")) {
        setTimeout(() => unlockSection("education"), 2000)
      }
      if (currentSection === "education" && !unlockedSections.has("achievements")) {
        setTimeout(() => unlockSection("achievements"), 2000)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [currentSection, unlockedSections])

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Game Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Interactive CV Game</h1>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>CV Exploration Progress</span>
            <span>{gameProgress}%</span>
          </div>
          <Progress value={gameProgress} className="h-3" />
        </div>

        {/* Achievements */}
        <AnimatePresence>
          {achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  {achievements[achievements.length - 1]}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="space-y-2">
          {cvSections.map((section) => (
            <Button
              key={section.id}
              variant={currentSection === section.id ? "default" : "outline"}
              className={`w-full justify-start ${!section.unlocked ? "opacity-50" : ""}`}
              onClick={() => section.unlocked && setCurrentSection(section.id)}
              disabled={!section.unlocked}
            >
              <div className="flex items-center gap-3">
                {section.unlocked ? (
                  <Unlock className="w-4 h-4 text-green-500" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
                {section.icon}
                <span>{section.title}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card className="min-h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {cvSections.find((s) => s.id === currentSection)?.icon}
                {cvSections.find((s) => s.id === currentSection)?.title}
              </CardTitle>
              <CardDescription>Explore different sections of my CV by spending time in each area</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {cvSections.find((s) => s.id === currentSection)?.content}
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
