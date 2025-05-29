"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, MessageSquare, Eye, Activity, TrendingUp, LogOut, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [stats, setStats] = useState({
    totalVisitors: 1247,
    messagesReceived: 23,
    projectViews: 892,
    chatbotInteractions: 156,
  })
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    checkAuthAndLoadData()
  }, [])

  const checkAuthAndLoadData = async () => {
    try {
      const response = await fetch("/api/admin/verify")
      if (!response.ok) {
        router.push("/admin")
        return
      }

      await loadDashboardData()
    } catch (error) {
      console.error("Auth check failed:", error)
      router.push("/admin")
    } finally {
      setIsLoading(false)
    }
  }

  const loadDashboardData = async () => {
    try {
      // Load messages
      const messagesResponse = await fetch("/api/admin/messages")
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json()
        setMessages(messagesData.messages || [])
      }

      // Load analytics
      const analyticsResponse = await fetch("/api/admin/analytics")
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json()
        setStats(analyticsData.stats || stats)
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your portfolio content and monitor analytics</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.messagesReceived}</div>
              <p className="text-xs text-muted-foreground">+3 new this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Project Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.projectViews}</div>
              <p className="text-xs text-muted-foreground">Most viewed: Space Orrery</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.chatbotInteractions}</div>
              <p className="text-xs text-muted-foreground">Avg. 3.2 per session</p>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="messages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Contact form submissions and inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.length > 0 ? (
                    messages.map((message, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{message.name}</span>
                            <Badge variant={message.status === "unread" ? "default" : "secondary"}>
                              {message.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{message.email}</p>
                          <p className="text-sm font-medium">{message.subject}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(message.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No messages yet</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Pages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { page: "/projects", views: 342, percentage: 38 },
                      { page: "/about", views: 289, percentage: 32 },
                      { page: "/skills", views: 156, percentage: 17 },
                      { page: "/contact", views: 123, percentage: 13 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{item.page}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                          </div>
                          <span className="text-sm text-muted-foreground">{item.views}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { source: "Direct", visitors: 456, percentage: 45 },
                      { source: "GitHub", visitors: 234, percentage: 23 },
                      { source: "LinkedIn", visitors: 189, percentage: 19 },
                      { source: "Twitter", visitors: 134, percentage: 13 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{item.source}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                          </div>
                          <span className="text-sm text-muted-foreground">{item.visitors}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Settings</CardTitle>
                <CardDescription>Configure your portfolio behavior and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Analytics Tracking</label>
                    <p className="text-sm text-muted-foreground">Track visitor behavior and interactions</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Email Notifications</label>
                    <p className="text-sm text-muted-foreground">Get notified of new messages</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
