import { NextResponse } from "next/server"

// Mock analytics data - in production, integrate with Google Analytics, Vercel Analytics, etc.
const analyticsData = {
  visitors: {
    total: 1247,
    growth: 12,
    thisWeek: 89,
    lastWeek: 79,
  },
  pageViews: {
    "/projects": 38,
    "/about": 24,
    "/skills": 18,
    "/contact": 12,
    "/testimonials": 8,
  },
  trafficSources: {
    direct: 45,
    github: 23,
    linkedin: 15,
    google: 10,
    other: 7,
  },
  chatbotInteractions: {
    total: 156,
    averageSession: 3.2,
    topQuestions: ["What technologies do you use?", "How much do you charge?", "Can you help with security?"],
  },
}

export async function GET() {
  return NextResponse.json(analyticsData)
}
