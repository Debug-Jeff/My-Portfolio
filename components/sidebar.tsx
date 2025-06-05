"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
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

  // Don't show sidebar on landing page
  if (pathname === "/landing") {
    return null
  }

  const filteredItems = navItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] glass-effect z-30 overflow-hidden shadow-lg border-r border-border/50",
        className
      )}
      style={{
        width: isCollapsed ? 80 : 280,
        transition: "width 0.2s ease-in-out",
      }}
    >
      <div className="flex h-full flex-col gap-4 p-4">
        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/image-1.jpg" alt="User" />
            <AvatarFallback>JM</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold">Jeff Mutugi</span>
              <span className="text-sm text-muted-foreground">Full Stack Developer</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2">
          {filteredItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant={pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-4",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && (
                  <>
                    <span>{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          ))}
        </nav>

        <Separator className="mt-auto" />

        {/* Quick Actions */}
        <nav className="flex flex-col gap-2">
          {quickActions.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant={pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-4",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!isCollapsed && <span>{item.name}</span>}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 right-4"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
