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
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-primary transition-colors">
          Jeff Mutugi
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/home" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/skills" className="hover:text-primary transition-colors">Skills</Link>
          <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background border-b border-border/40"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                href="/home"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/skills"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </Link>
              <Link
                href="/projects"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
