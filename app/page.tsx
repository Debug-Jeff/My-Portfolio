"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 50)
      mouseY.set((e.clientY - window.innerHeight / 2) / 50)
    }

    window.addEventListener('mousemove', handleMouseMove)
    setShowContent(true)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const roles = [
    { text: "Cybersecurity Specialist", color: "from-green-400 to-emerald-600", icon: "🛡️" },
    { text: "Full-stack Developer", color: "from-blue-400 to-cyan-600", icon: "💻" },
    { text: "Digital Builder", color: "from-purple-400 to-violet-600", icon: "🔧" },
    { text: "Ethical Hacker", color: "from-red-400 to-orange-600", icon: "🔐" },
  ]

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      <EnhancedMatrixRain />
      <FloatingParticles />
      <CyberGrid />
      
      {/* Dynamic Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(120, 255, 198, 0.3) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />

      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
            style={{
              x: smoothMouseX,
              y: smoothMouseY,
            }}
          >
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateX: -180 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ 
                duration: 1.5, 
                type: "spring", 
                stiffness: 100,
                delay: 0.2 
              }}
              className="mb-12"
            >
              <HolographicText className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider">
                JEFF MUTUGI
              </HolographicText>
              
              {/* Subtitle with typing effect */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 20, ease: "easeInOut" }}
                className="overflow-hidden mx-auto mt-4"
              >
                <div className="text-xl md:text-2xl text-gray-300 font-mono border-r-2 border-cyan-400 animate-blink">
                  System.initialize("portfolio_v2.0")
                </div>
              </motion.div>
            </motion.div>

            {/* Role Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1, staggerChildren: 0.2 }}
            >
              {roles.map((role, index) => (
                <motion.div
                  key={role.text}
                  initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                  transition={{ 
                    delay: 2.2 + index * 0.3,
                    duration: 1.4,
                    type: "spring",
                    stiffness: 120
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { duration: 0.2 }
                  }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-3000 rounded-xl blur-xl"
                      style={{ background: `linear-gradient(45deg, ${role.color.split(' ')[1]}, ${role.color.split(' ')[3]})` }} />
                  
                  <div className="relative glass border border-white/10 rounded-xl p-6 backdrop-blur-xl bg-black/20 hover:bg-black/30 transition-all duration-3000">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{role.icon}</div>
                      <div>
                        <GlitchText 
                          className={`text-lg font-bold bg-gradient-to-r ${role.color} bg-clip-text text-transparent`}
                          delay={2.5 + index * 0.3}
                        >
                          {"> "} {role.text}
                        </GlitchText>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex gap-4 items-center justify-center">
              <Button
                onClick={() => router.push('/home')}
                className="px-8 py-2 text-lg"
                variant="default"
              >
                Explore Portfolio
              </Button>
              <div className="fixed top-4 right-4">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Custom Matrix Rain Component
function EnhancedMatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];
    const brightness: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
      speeds[i] = Math.random() * 0.5 + 0.5;
      brightness[i] = Math.random();
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const alpha = Math.sin(brightness[i]) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
        
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = Math.random() * 0.5 + 0.5;
        }

        drops[i] += speeds[i];
        brightness[i] += 0.01;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

// Floating Particles Component
function FloatingParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// Holographic Text Component
function HolographicText({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, rotateX: -90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      transition={{ delay, duration: 1.2, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent blur-sm">
        {children}
      </div>
      <div className="relative bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
        {children}
      </div>
    </motion.div>
  );
}

// Glitch Text Component
function GlitchText({ children, className = "", delay = 0 }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative font-mono ${className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      <div className={`${isGlitching ? 'animate-pulse' : ''}`}>
        {isGlitching && (
          <>
            <div className="absolute inset-0 text-red-500 transform translate-x-1 opacity-70">
              {children}
            </div>
            <div className="absolute inset-0 text-blue-500 transform -translate-x-1 opacity-70">
              {children}
            </div>
          </>
        )}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}

// Cyber Grid Background
function CyberGrid() {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />
    </div>
  );
}
