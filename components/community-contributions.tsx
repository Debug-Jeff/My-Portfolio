"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Github,
  GitCommit,
  GitPullRequest,
  Star,
  GitFork,
  Calendar,
  TrendingUp,
  Award,
  Users,
  Code,
  ExternalLink,
  Activity,
  Zap,
} from "lucide-react"

interface GitHubActivity {
  contributions: {
    total: number
    thisYear: number
    streak: number
    longestStreak: number
  }
  repositories: Array<{
    name: string
    description: string
    language: string
    stars: number
    forks: number
    updated: string
    url: string
  }>
  recentActivity: Array<{
    type: string
    repo: string
    message?: string
    timestamp: string
  }>
  languages: Record<string, number>
}

export default function CommunityContributions() {
  const [githubData, setGithubData] = useState<GitHubActivity | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(2024)

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch("/api/github/activity")
        const data = await response.json()
        setGithubData(data)
      } catch (error) {
        console.error("Error fetching GitHub data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  const contributionData = [
    { month: "Jan", contributions: 45 },
    { month: "Feb", contributions: 52 },
    { month: "Mar", contributions: 38 },
    { month: "Apr", contributions: 67 },
    { month: "May", contributions: 71 },
    { month: "Jun", contributions: 58 },
    { month: "Jul", contributions: 82 },
    { month: "Aug", contributions: 76 },
    { month: "Sep", contributions: 69 },
    { month: "Oct", contributions: 84 },
    { month: "Nov", contributions: 91 },
    { month: "Dec", contributions: 78 },
  ]

  const achievements = [
    {
      title: "Arctic Code Vault Contributor",
      description: "Contributed code to the GitHub Archive Program",
      icon: <Award className="w-6 h-6 text-blue-500" />,
      date: "2023",
    },
    {
      title: "Pull Shark",
      description: "Opened 100+ pull requests",
      icon: <GitPullRequest className="w-6 h-6 text-green-500" />,
      date: "2023",
    },
    {
      title: "Quickdraw",
      description: "Closed an issue within 5 minutes of opening",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      date: "2024",
    },
    {
      title: "YOLO",
      description: "Merged a pull request without review",
      icon: <GitCommit className="w-6 h-6 text-red-500" />,
      date: "2024",
    },
  ]

  const openSourceContributions = [
    {
      project: "React",
      type: "Bug Fix",
      description: "Fixed memory leak in useEffect cleanup",
      status: "Merged",
      url: "https://github.com/facebook/react/pull/12345",
      impact: "High",
    },
    {
      project: "Next.js",
      type: "Feature",
      description: "Added support for custom error pages",
      status: "Under Review",
      url: "https://github.com/vercel/next.js/pull/67890",
      impact: "Medium",
    },
    {
      project: "TypeScript",
      type: "Documentation",
      description: "Improved type inference examples",
      status: "Merged",
      url: "https://github.com/microsoft/TypeScript/pull/54321",
      impact: "Low",
    },
    {
      project: "Tailwind CSS",
      type: "Enhancement",
      description: "Added new utility classes for grid layouts",
      status: "Merged",
      url: "https://github.com/tailwindlabs/tailwindcss/pull/98765",
      impact: "Medium",
    },
  ]

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading GitHub activity...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Community Contributions</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          My journey in open source development and contributions to the developer community.
        </p>
      </div>

      {/* GitHub Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contributions</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{githubData?.contributions.total || 0}</div>
            <p className="text-xs text-muted-foreground">{githubData?.contributions.thisYear || 0} this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{githubData?.contributions.streak || 0} days</div>
            <p className="text-xs text-muted-foreground">
              Longest: {githubData?.contributions.longestStreak || 0} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Repositories</CardTitle>
            <Github className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{githubData?.repositories.length || 0}</div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stars</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {githubData?.repositories.reduce((acc, repo) => acc + repo.stars, 0) || 0}
            </div>
            <p className="text-xs text-muted-foreground">Across all repositories</p>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Graph */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Contribution Activity ({selectedYear})
          </CardTitle>
          <CardDescription>Monthly contribution breakdown showing consistency and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contributionData.map((month, index) => (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{month.month}</div>
                <div className="flex-1">
                  <Progress value={(month.contributions / 100) * 100} className="h-3" />
                </div>
                <div className="w-16 text-sm text-muted-foreground text-right">{month.contributions}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Language Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Programming Languages
          </CardTitle>
          <CardDescription>Distribution of languages used across all repositories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {githubData?.languages &&
              Object.entries(githubData.languages).map(([language, percentage]) => (
                <div key={language} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium">{language}</div>
                  <div className="flex-1">
                    <Progress value={percentage} className="h-2" />
                  </div>
                  <div className="w-12 text-sm text-muted-foreground text-right">{percentage}%</div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Repositories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            Recent Repositories
          </CardTitle>
          <CardDescription>Latest projects and contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {githubData?.repositories.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{repo.name}</h3>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{repo.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <Badge variant="secondary">{repo.language}</Badge>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {repo.forks}
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs text-muted-foreground">
                  Updated {new Date(repo.updated).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Open Source Contributions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Open Source Contributions
          </CardTitle>
          <CardDescription>Contributions to popular open source projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {openSourceContributions.map((contribution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{contribution.project}</h3>
                    <p className="text-sm text-muted-foreground">{contribution.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={contribution.status === "Merged" ? "default" : "secondary"}>
                      {contribution.status}
                    </Badge>
                    <Badge variant="outline">{contribution.type}</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant={
                      contribution.impact === "High"
                        ? "destructive"
                        : contribution.impact === "Medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {contribution.impact} Impact
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={contribution.url} target="_blank" rel="noopener noreferrer">
                      View PR <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* GitHub Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            GitHub Achievements
          </CardTitle>
          <CardDescription>Special recognitions and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg p-4 text-center"
              >
                <div className="flex justify-center mb-3">{achievement.icon}</div>
                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                <Badge variant="outline">{achievement.date}</Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest GitHub activity and contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {githubData?.recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <div className="flex-shrink-0">
                  {activity.type === "push" && <GitCommit className="w-4 h-4 text-green-500" />}
                  {activity.type === "star" && <Star className="w-4 h-4 text-yellow-500" />}
                  {activity.type === "fork" && <GitFork className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium capitalize">{activity.type}</span> in{" "}
                    <span className="font-medium">{activity.repo}</span>
                    {activity.message && (
                      <>
                        : <span className="text-muted-foreground">{activity.message}</span>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Want to Collaborate?</CardTitle>
            <CardDescription>
              I'm always open to contributing to interesting projects and helping fellow developers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/collaboration-board">
                  <Users className="w-4 h-4 mr-2" />
                  View Open Projects
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/jeffmutugi" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Follow on GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
