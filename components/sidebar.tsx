"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Code,
  Briefcase,
  MessageSquare,
  Mail,
  FileText,
  Users,
  GitBranch,
  Search,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { name: "Home", path: "/home", icon: Home, badge: null },
  { name: "About", path: "/about", icon: User, badge: null },
  { name: "Skills", path: "/skills", icon: Code, badge: null },
  { name: "Projects", path: "/projects", icon: Briefcase, badge: "12" },
  { name: "Interactive CV", path: "/interactive-cv", icon: FileText, badge: null },
  { name: "Collaboration", path: "/collaboration-board", icon: GitBranch, badge: "3" },
  { name: "Community", path: "/community", icon: Users, badge: null },
  { name: "Testimonials", path: "/testimonials", icon: MessageSquare, badge: "5" },
  { name: "Contact", path: "/contact", icon: Mail, badge: null },
]

const quickActions = [{ name: "Request Project", path: "/request-project", icon: Calendar }]

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className = "" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  // Auto-collapse on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Don't show sidebar on admin pages
  if (pathname.startsWith("/admin")) {
    return null
  }

  const filteredItems = navItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-md border-r border-border/50 z-30 overflow-hidden ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.jpg" alt="Jeff Mutugi" />
                  <AvatarFallback>JM</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-sm">Jeff Mutugi</div>
                  <div className="text-xs text-muted-foreground">Developer</div>
                </div>
              </motion.div>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          </div>

          {/* Search */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={14}
                />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-8 text-sm"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 pt-4">
          <nav className="space-y-1">
            {filteredItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.path

              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group relative ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-accent text-foreground/80 hover:text-foreground"
                    }`}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon size={18} className="transition-transform group-hover:scale-110 flex-shrink-0" />

                    {!isCollapsed && (
                      <>
                        <span className="font-medium text-sm flex-1">{item.name}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}

                    {isCollapsed && item.badge && (
                      <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-primary-foreground">{item.badge}</span>
                      </div>
                    )}

                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                        layoutId="sidebar-indicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          {/* Quick Actions */}
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8">
              <Separator className="mb-4" />
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Quick Actions
              </div>
              <div className="space-y-1">
                {quickActions.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-accent text-foreground/80 hover:text-foreground group"
                    >
                      <Icon size={16} className="transition-transform group-hover:scale-110" />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          {!isCollapsed ? (
            <div className="space-y-3">
              <Button asChild className="w-full h-8 text-xs">
                <Link href="/contact">
                  <Mail size={14} className="mr-2" />
                  Reach Me
                </Link>
              </Button>
              <div className="text-xs text-muted-foreground text-center">
                <span>© 2024 Jeff Mutugi</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Button size="sm" className="h-8 w-8 p-0" asChild>
                <Link href="/contact">
                  <Mail size={14} />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
