"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SkillBox from "@/components/skill-box"
import SkillTicker from "@/components/skill-ticker"

export default function SkillsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const languages = [
    { name: "Python", icon: "python", level: 90 },
    { name: "JavaScript", icon: "javascript", level: 95 },
    { name: "TypeScript", icon: "typescript", level: 85 },
    { name: "HTML", icon: "html", level: 98 },
    { name: "CSS", icon: "css", level: 92 },
  ]

  const frameworks = [
    { name: "React", icon: "react", level: 95 },
    { name: "Next.js", icon: "nextjs", level: 88 },
    { name: "Django", icon: "django", level: 80 },
    { name: "Express.js", icon: "express", level: 85 },
    { name: "Tailwind CSS", icon: "tailwind", level: 90 },
  ]

  const tools = [
    { name: "Figma", icon: "figma", level: 88 },
    { name: "GitHub", icon: "github", level: 95 },
    { name: "VS Code", icon: "vscode", level: 98 },
    { name: "WordPress", icon: "wordpress", level: 75 },
    { name: "Docker", icon: "docker", level: 78 },
    { name: "Linux", icon: "linux", level: 85 },
  ]

  const databases = [
    { name: "MongoDB", icon: "mongodb", level: 85 },
    { name: "MySQL", icon: "mysql", level: 88 },
    { name: "PostgreSQL", icon: "postgresql", level: 82 },
    { name: "REST APIs", icon: "api", level: 92 },
    { name: "GraphQL", icon: "graphql", level: 75 },
  ]

  const security = [
    { name: "Kali Linux", icon: "kali", level: 85 },
    { name: "Nmap", icon: "nmap", level: 90 },
    { name: "Metasploit", icon: "metasploit", level: 78 },
    { name: "Burp Suite", icon: "burp", level: 88 },
    { name: "Wireshark", icon: "wireshark", level: 85 },
    { name: "OWASP ZAP", icon: "zap", level: 80 },
    { name: "Nessus", icon: "nessus", level: 75 },
    { name: "Aircrack-ng", icon: "aircrack", level: 70 },
    { name: "John the Ripper", icon: "john", level: 72 },
    { name: "Hashcat", icon: "hashcat", level: 68 },
  ]

  const collaboration = [
    { name: "Git", icon: "git", level: 95 },
    { name: "GitLab", icon: "gitlab", level: 88 },
    { name: "Bitbucket", icon: "bitbucket", level: 82 },
    { name: "Jira", icon: "jira", level: 85 },
    { name: "Slack", icon: "slack", level: 90 },
    { name: "Notion", icon: "notion", level: 88 },
  ]

  // Combine all skills for tickers
  const allSkills = [...languages, ...frameworks, ...tools, ...databases, ...security, ...collaboration]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const skillSections = [
    {
      title: "Languages & Frameworks",
      subtitle: "Core Programming Technologies",
      icon: "💻",
      skills: [...languages, ...frameworks],
      gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
      borderGradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Development Tools",
      subtitle: "Design & Development Platforms", 
      icon: "🛠️",
      skills: tools,
      gradient: "from-green-500/10 via-teal-500/10 to-blue-500/10",
      borderGradient: "from-green-500 to-teal-500"
    },
    {
      title: "Databases & APIs",
      subtitle: "Data Management & Integration",
      icon: "🗄️",
      skills: databases,
      gradient: "from-orange-500/10 via-red-500/10 to-pink-500/10",
      borderGradient: "from-orange-500 to-red-500"
    },
    {
      title: "Version Control & Collaboration",
      subtitle: "Team Workflow & Project Management",
      icon: "🤝",
      skills: collaboration,
      gradient: "from-indigo-500/10 via-blue-500/10 to-cyan-500/10",
      borderGradient: "from-indigo-500 to-blue-500"
    },
    {
      title: "Cybersecurity Arsenal",
      subtitle: "Penetration Testing & Security Analysis",
      icon: "🔒",
      skills: security,
      gradient: "from-red-500/10 via-orange-500/10 to-yellow-500/10",
      borderGradient: "from-red-500 to-orange-500"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />

      <main className="flex-grow container mx-auto py-20 px-4 relative">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 relative z-10"
          variants={titleVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-6xl mb-4">⚡</div>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            My Skills
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            A comprehensive toolkit spanning full-stack development, cybersecurity, and modern collaboration
          </p>
          
          {/* Stats */}
          <motion.div 
            className="flex justify-center gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{allSkills.length}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">3+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Top Ticker */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <SkillTicker skills={allSkills} direction="left" />
        </motion.div>

        {/* Skills Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="space-y-20"
        >
          {skillSections.map((section, sectionIndex) => (
            <motion.section
              key={section.title}
              variants={sectionVariants}
              className="relative"
            >
              {/* Section Header */}
              <div className="text-center mb-12">
                <motion.div
                  className="inline-flex items-center gap-4 mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl">{section.icon}</div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mt-1">
                      {section.subtitle}
                    </p>
                  </div>
                </motion.div>
                
                {/* Progress Bar */}
                <div className="w-24 h-1 mx-auto rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${section.borderGradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: sectionIndex * 0.2 + 0.5, duration: 1 }}
                  />
                </div>
              </div>

              {/* Skills Grid */}
              <div className={`p-8 rounded-3xl bg-gradient-to-br ${section.gradient} backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-xl`}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {section.skills.map((skill, index) => (
                    <motion.div
                      key={`${section.title}-${skill.name}`}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: sectionIndex * 0.1 + index * 0.05,
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      className="group"
                    >
                      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
                        {/* Skill Icon/Name */}
                        <div className="text-center mb-3">
                          <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300">
                            {skill.name.charAt(0)}
                          </div>
                          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {skill.name}
                          </h3>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${section.borderGradient} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ 
                              delay: sectionIndex * 0.2 + index * 0.1 + 0.5,
                              duration: 1,
                              ease: "easeOut"
                            }}
                          />
                        </div>
                        
                        {/* Proficiency Text */}
                        <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-2 font-medium">
                          {skill.level}% Proficient
                        </div>

                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${section.borderGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none blur-xl`}></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </motion.div>

        {/* Bottom Ticker */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16"
        >
          <SkillTicker skills={allSkills} direction="right" />
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}