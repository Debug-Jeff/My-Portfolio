"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Don't show navbar on admin pages
  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/50" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/landing" className="flex items-center space-x-2 group">
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-primary-foreground font-bold text-sm">JM</span>
              </motion.div>
              <div>
                <span className="font-bold text-xl">Jeff</span>
                <span className="text-primary font-bold text-xl"> Mutugi</span>
                <div className="text-xs text-muted-foreground hidden sm:block">Developer & Security Specialist</div>
              </div>
            </Link>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 h-9 bg-background/50 border-border/50"
                />
              </div>

              <ThemeToggle />

              {/* CTA Button */}
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Link href="/contact">Reach Me</Link>
              </Button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="ml-2"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-md border-l border-border/50 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">JM</span>
                    </div>
                    <div>
                      <div className="font-bold text-lg">Jeff Mutugi</div>
                      <div className="text-xs text-muted-foreground">Developer & Security</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X size={20} />
                  </Button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <Input
                    placeholder="Search navigation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* CTA Section */}
                <div className="space-y-3 mb-8">
                  <Button asChild className="w-full bg-gradient-to-r from-primary to-primary/80">
                    <Link href="/contact">Reach Me</Link>
                  </Button>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-border/50 text-center">
                  <div className="text-xs text-muted-foreground">© 2024 Jeff Mutugi. All rights reserved.</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
