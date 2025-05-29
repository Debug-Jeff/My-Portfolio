"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useRouter } from "next/navigation"

// Custom Matrix Rain Component (enhanced version)
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

export default function CoverPage() {
  const [showContent, setShowContent] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const router = useRouter()
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 50)
      mouseY.set((e.clientY - window.innerHeight / 2) / 50)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowContent(true), 800),
      setTimeout(() => setCurrentPhase(1), 2000),
      setTimeout(() => setCurrentPhase(2), 3000),
      setTimeout(() => setCurrentPhase(3), 4000),
      setTimeout(() => setFadeOut(true), 6000),
      setTimeout(() => router.push("/landing"), 7500),
    ]

    return () => timers.forEach(clearTimeout)
  }, [router])

  const roles = [
    { text: "Cybersecurity Specialist", color: "from-green-400 to-emerald-600", icon: "🛡️" },
    { text: "Full-stack Developer", color: "from-blue-400 to-cyan-600", icon: "💻" },
    { text: "Digital Builder", color: "from-purple-400 to-violet-600", icon: "🔧" },
    { text: "Ethical Hacker", color: "from-red-400 to-orange-600", icon: "🔐" },
  ]

  return (
    <AnimatePresence>
      <motion.div
        className="h-screen w-full relative overflow-hidden bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        {/* Background Elements */}
        <CyberGrid />
        <EnhancedMatrixRain />
        <FloatingParticles />
        
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

        {/* Main Content */}
        <motion.div
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
          }}
        >
          <AnimatePresence>
            {showContent && (
              <>
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
                    transition={{ delay: 1.5, duration: 2, ease: "easeInOut" }}
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
                        duration: 0.8,
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
                      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur-xl"
                           style={{ background: `linear-gradient(45deg, ${role.color.split(' ')[1]}, ${role.color.split(' ')[3]})` }} />
                      
                      <div className="relative glass border border-white/10 rounded-xl p-6 backdrop-blur-xl bg-black/20 hover:bg-black/30 transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{role.icon}</div>
                          <div>
                            <GlitchText 
                              className={`text-lg font-bold bg-gradient-to-r ${role.color} bg-clip-text text-transparent`}
                              delay={2.5 + index * 0.3}
                            >
                              {">"} {role.text}
                            </GlitchText>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Status Display */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4, duration: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-center space-x-4 text-sm font-mono">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400">SYSTEM ONLINE</span>
                    </motion.div>
                    <div className="text-gray-500">|</div>
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-400">LOADING PORTFOLIO</span>
                    </motion.div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-64 mx-auto">
                    <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 4.5, duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 5, duration: 0.5 }}
                      className="text-center text-xs text-gray-400 mt-2 font-mono"
                    >
                      INITIALIZATION COMPLETE
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enter Command */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 5.5, duration: 0.8 }}
                  className="mt-8"
                >
                  <div className="text-gray-400 font-mono text-sm mb-2">
                    Press any key to continue...
                  </div>
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(0, 255, 255, 0.3)",
                        "0 0 40px rgba(0, 255, 255, 0.6)",
                        "0 0 20px rgba(0, 255, 255, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block px-4 py-2 border border-cyan-400/50 rounded-lg bg-cyan-400/10 backdrop-blur-sm"
                  >
                    <span className="text-cyan-400 font-mono">ENTER ↵</span>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-400/50"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-400/50"></div>
      </motion.div>
    </AnimatePresence>
  )
}