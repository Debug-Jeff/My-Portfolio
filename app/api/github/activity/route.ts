import { NextResponse } from "next/server"

// Mock GitHub activity data
// In production, fetch from GitHub API: https://api.github.com/users/jeffmutugi/events
const githubActivity = {
  contributions: {
    total: 1247,
    thisYear: 892,
    streak: 23,
    longestStreak: 67,
  },
  repositories: [
    {
      name: "portfolio-website",
      description: "My personal portfolio built with Next.js",
      language: "TypeScript",
      stars: 45,
      forks: 12,
      updated: "2024-01-15T10:30:00Z",
      url: "https://github.com/jeffmutugi/portfolio-website",
    },
    {
      name: "security-toolkit",
      description: "Collection of cybersecurity tools and scripts",
      language: "Python",
      stars: 128,
      forks: 34,
      updated: "2024-01-14T15:45:00Z",
      url: "https://github.com/jeffmutugi/security-toolkit",
    },
    {
      name: "react-components",
      description: "Reusable React components library",
      language: "JavaScript",
      stars: 67,
      forks: 23,
      updated: "2024-01-13T09:20:00Z",
      url: "https://github.com/jeffmutugi/react-components",
    },
  ],
  recentActivity: [
    {
      type: "push",
      repo: "portfolio-website",
      message: "Add interactive CV component",
      timestamp: "2024-01-15T10:30:00Z",
    },
    {
      type: "star",
      repo: "awesome-security-tools",
      timestamp: "2024-01-15T08:15:00Z",
    },
    {
      type: "fork",
      repo: "open-source-project",
      timestamp: "2024-01-14T16:45:00Z",
    },
  ],
  languages: {
    TypeScript: 35,
    JavaScript: 28,
    Python: 20,
    Go: 10,
    Rust: 7,
  },
}

export async function GET() {
  return NextResponse.json(githubActivity)
}
