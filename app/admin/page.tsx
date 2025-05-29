"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  const maxAttempts = 3
  const isBlocked = attempts >= maxAttempts

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      toast({
        title: "Access Blocked",
        description: "Too many failed attempts. Please try again later.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        toast({
          title: "Access Granted",
          description: "Welcome to the admin dashboard.",
        })
        router.push("/admin/dashboard")
      } else {
        setAttempts((prev) => prev + 1)
        toast({
          title: "Access Denied",
          description: `Invalid credentials. ${maxAttempts - attempts - 1} attempts remaining.`,
          variant: "destructive",
        })
        setPassword("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>Restricted area - Developer access only</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading || isBlocked}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isBlocked}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {attempts > 0 && (
                <div className="flex items-center space-x-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>
                    {isBlocked
                      ? "Access blocked due to multiple failed attempts"
                      : `${attempts}/${maxAttempts} failed attempts`}
                  </span>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || isBlocked || !password}>
                {isLoading ? "Authenticating..." : "Access Admin Panel"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="text-muted-foreground">
                ← Back to Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
