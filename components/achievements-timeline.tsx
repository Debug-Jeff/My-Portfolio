// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Calendar, Award, Trophy, Star, Zap, Target } from "lucide-react"
// import { Badge } from "@/components/ui/badge"

// interface Achievement {
//   id: string
//   title: string
//   description: string
//   date: string
//   category: "education" | "award" | "certification" | "project" | "milestone"
//   icon: React.ReactNode
//   color: string
//   details?: string[]
// }

// export default function AchievementsTimeline() {
//   const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null)
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     setIsVisible(true)
//   }, [])

//   const achievements: Achievement[] = [
//     {
//       id: "nasa-hackathon",
//       title: "NASA Space Apps Hackathon Winner",
//       description: "Won 1st place in Kenya edition with Space Orrery project",
//       date: "2024-10",
//       category: "award",
//       icon: <Trophy className="w-5 h-5" />,
//       color: "bg-yellow-500",
//       details: [
//         "Led a team of 4 developers",
//         "Built 3D orbital visualization system",
//         "Used NASA's open data APIs",
//         "Implemented real-time tracking",
//       ],
//     },
//     {
//       id: "university-start",
//       title: "Started Computer Science at ANU",
//       description: "Began specializing in Cybersecurity at Africa Nazarene University",
//       date: "2024-09",
//       category: "education",
//       icon: <Star className="w-5 h-5" />,
//       color: "bg-blue-500",
//       details: ["Focus on Cybersecurity", "Offensive Security track", "Dean's List first semester"],
//     },
//     {
//       id: "first-ctf",
//       title: "First CTF Competition Win",
//       description: "Won local Capture The Flag cybersecurity competition",
//       date: "2024-08",
//       category: "award",
//       icon: <Target className="w-5 h-5" />,
//       color: "bg-red-500",
//       details: ["Web exploitation category", "Solved 15/20 challenges", "Team collaboration"],
//     },
//     {
//       id: "high-school-grad",
//       title: "High School Graduation",
//       description: "Graduated from Murang'a High School with distinction",
//       date: "2023-11",
//       category: "education",
//       icon: <Award className="w-5 h-5" />,
//       color: "bg-green-500",
//       details: ["Mathematics & Sciences focus", "Top 5% of class", "Computer Club President"],
//     },
//     {
//       id: "first-website",
//       title: "Built First Professional Website",
//       description: "Developed first client website using React and Node.js",
//       date: "2023-06",
//       category: "project",
//       icon: <Zap className="w-5 h-5" />,
//       color: "bg-purple-500",
//       details: ["E-commerce platform", "Payment integration", "Mobile responsive design"],
//     },
//     {
//       id: "coding-start",
//       title: "Started Programming Journey",
//       description: "Wrote first lines of code in Python",
//       date: "2022-01",
//       category: "milestone",
//       icon: <Star className="w-5 h-5" />,
//       color: "bg-indigo-500",
//       details: ["Self-taught Python basics", "Built simple calculator", "Discovered passion for coding"],
//     },
//   ]

//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case "award":
//         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
//       case "education":
//         return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
//       case "certification":
//         return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//       case "project":
//         return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
//       case "milestone":
//         return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <motion.h2
//         className="text-3xl font-bold mb-8 text-center"
//         initial={{ opacity: 0, y: -20 }}
//         animate={isVisible ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.6 }}
//       >
//         Timeline of Achievements
//       </motion.h2>

//       <div className="relative">
//         {/* Timeline line */}
//         <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

//         <div className="space-y-8">
//           {achievements.map((achievement, index) => (
//             <motion.div
//               key={achievement.id}
//               className="relative flex items-start gap-6 cursor-pointer group"
//               initial={{ opacity: 0, x: -50 }}
//               animate={isVisible ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               onClick={() => setSelectedAchievement(achievement)}
//             >
//               {/* Timeline dot */}
//               <div
//                 className={`relative z-10 w-16 h-16 ${achievement.color} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
//               >
//                 {achievement.icon}
//               </div>

//               {/* Content */}
//               <div className="flex-1 bg-card border rounded-lg p-6 shadow-sm group-hover:shadow-md transition-shadow">
//                 <div className="flex items-start justify-between mb-2">
//                   <div>
//                     <h3 className="text-lg font-semibold mb-1">{achievement.title}</h3>
//                     <p className="text-muted-foreground">{achievement.description}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Badge className={getCategoryColor(achievement.category)}>{achievement.category}</Badge>
//                     <div className="flex items-center text-sm text-muted-foreground">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       {new Date(achievement.date).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                       })}
//                     </div>
//                   </div>
//                 </div>

//                 {achievement.details && (
//                   <div className="mt-4">
//                     <ul className="text-sm text-muted-foreground space-y-1">
//                       {achievement.details.map((detail, i) => (
//                         <li key={i} className="flex items-center">
//                           <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
//                           {detail}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Achievement stats */}
//       <motion.div
//         className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
//         initial={{ opacity: 0, y: 20 }}
//         animate={isVisible ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.6, delay: 0.8 }}
//       >
//         <div className="text-center p-4 bg-card border rounded-lg">
//           <div className="text-2xl font-bold text-primary">3+</div>
//           <div className="text-sm text-muted-foreground">Years Coding</div>
//         </div>
//         <div className="text-center p-4 bg-card border rounded-lg">
//           <div className="text-2xl font-bold text-primary">10+</div>
//           <div className="text-sm text-muted-foreground">Projects Built</div>
//         </div>
//         <div className="text-center p-4 bg-card border rounded-lg">
//           <div className="text-2xl font-bold text-primary">2</div>
//           <div className="text-sm text-muted-foreground">Hackathon Wins</div>
//         </div>
//         <div className="text-center p-4 bg-card border rounded-lg">
//           <div className="text-2xl font-bold text-primary">5+</div>
//           <div className="text-sm text-muted-foreground">CTF Competitions</div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }
