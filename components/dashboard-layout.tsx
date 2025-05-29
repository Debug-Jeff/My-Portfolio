"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import Sidebar from "./sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  // Hide sidebar on certain pages
  const hideSidebar = pathname === "/" || pathname === "/landing"

  useEffect(() => {
    // Auto-hide sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        {!hideSidebar && sidebarOpen && <Sidebar className="hidden lg:block" />}

        <main
          className={`flex-1 transition-all duration-300 ${!hideSidebar && sidebarOpen ? "lg:ml-80" : "ml-0"} pt-16`}
        >
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
