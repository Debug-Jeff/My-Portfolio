"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

interface Connection {
  from: Particle
  to: Particle
  opacity: number
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationRef = useRef<number>()
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      hue: Math.random() * 60 + 200, // Blue to purple range
    })

    const initParticles = () => {
      particlesRef.current = Array.from({ length: 80 }, createParticle)
    }

    const updateParticle = (particle: Particle) => {
      // Validate and sanitize particle properties
      if (!isFinite(particle.x)) particle.x = Math.random() * canvas.width
      if (!isFinite(particle.y)) particle.y = Math.random() * canvas.height
      if (!isFinite(particle.vx)) particle.vx = (Math.random() - 0.5) * 0.5
      if (!isFinite(particle.vy)) particle.vy = (Math.random() - 0.5) * 0.5

      // Mouse attraction with safety checks
      const dx = mouseRef.current.x - particle.x
      const dy = mouseRef.current.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (isFinite(distance) && distance > 0 && distance < 150) {
        const force = Math.min(((150 - distance) / 150) * 0.01, 0.1) // Cap the force
        const normalizedDx = dx / distance
        const normalizedDy = dy / distance

        if (isFinite(normalizedDx) && isFinite(normalizedDy)) {
          particle.vx += normalizedDx * force
          particle.vy += normalizedDy * force
        }
      }

      // Update position with velocity capping
      particle.vx = Math.max(-5, Math.min(5, particle.vx)) // Cap velocity
      particle.vy = Math.max(-5, Math.min(5, particle.vy))

      particle.x += particle.vx
      particle.y += particle.vy

      // Boundary collision with proper bounds checking
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      }

      // Damping with validation
      particle.vx *= 0.99
      particle.vy *= 0.99

      // Opacity variation with bounds
      particle.opacity += (Math.random() - 0.5) * 0.01
      particle.opacity = Math.max(0.1, Math.min(0.7, particle.opacity))

      // Ensure all properties remain finite
      if (!isFinite(particle.opacity)) particle.opacity = 0.5
      if (!isFinite(particle.size)) particle.size = 2
      if (!isFinite(particle.hue)) particle.hue = 220
    }

    const findConnections = () => {
      connectionsRef.current = []
      const maxDistance = 120

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3
            connectionsRef.current.push({
              from: p1,
              to: p2,
              opacity,
            })
          }
        }
      }
    }

    const drawParticle = (particle: Particle) => {
      // Validate particle properties to prevent non-finite values
      if (!isFinite(particle.x) || !isFinite(particle.y) || !isFinite(particle.size) || !isFinite(particle.opacity)) {
        return // Skip drawing this particle if any value is invalid
      }

      // Ensure values are within reasonable bounds
      const x = Math.max(0, Math.min(canvas.width, particle.x))
      const y = Math.max(0, Math.min(canvas.height, particle.y))
      const size = Math.max(0.1, Math.min(10, particle.size))
      const opacity = Math.max(0, Math.min(1, particle.opacity))
      const hue = Math.max(0, Math.min(360, particle.hue))

      ctx.save()
      ctx.globalAlpha = opacity

      // Create gradient with validated values
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2)
      gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`)
      gradient.addColorStop(1, `hsl(${hue}, 70%, 30%)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawConnection = (connection: Connection) => {
      ctx.save()
      ctx.globalAlpha = connection.opacity
      ctx.strokeStyle = `hsl(220, 50%, 50%)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(connection.from.x, connection.from.y)
      ctx.lineTo(connection.to.x, connection.to.y)
      ctx.stroke()
      ctx.restore()
    }

    const animate = () => {
      if (!isActive) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update particles
      particlesRef.current.forEach(updateParticle)

      // Find connections
      findConnections()

      // Draw connections first (behind particles)
      connectionsRef.current.forEach(drawConnection)

      // Draw particles
      particlesRef.current.forEach(drawParticle)

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleVisibilityChange = () => {
      setIsActive(!document.hidden)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />
}
