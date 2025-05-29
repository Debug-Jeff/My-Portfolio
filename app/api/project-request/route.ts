import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

const projectRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectTitle: z.string().min(5),
  projectType: z.enum(["web-app", "mobile-app", "desktop-app", "api", "security-audit", "consultation"]),
  description: z.string().min(50),
  features: z.array(z.string()).min(1),
  technologies: z.array(z.string()).optional(),
  platforms: z.array(z.string()).optional(),
  timeline: z.enum(["1-2-weeks", "1-month", "2-3-months", "3-6-months", "6-months-plus"]),
  budget: z.enum(["under-5k", "5k-10k", "10k-25k", "25k-50k", "50k-plus", "discuss"]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  hasDesigns: z.boolean(),
  hasContent: z.boolean(),
  needsHosting: z.boolean(),
  needsMaintenance: z.boolean(),
  additionalNotes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = projectRequestSchema.parse(body)

    const result = await sql`
      INSERT INTO project_requests (
        name, email, company, phone, project_title, project_type, description,
        features, technologies, platforms, timeline, budget, priority,
        has_designs, has_content, needs_hosting, needs_maintenance, additional_notes
      )
      VALUES (
        ${validatedData.name}, ${validatedData.email}, ${validatedData.company || null}, 
        ${validatedData.phone || null}, ${validatedData.projectTitle}, ${validatedData.projectType},
        ${validatedData.description}, ${JSON.stringify(validatedData.features)},
        ${JSON.stringify(validatedData.technologies || [])}, ${JSON.stringify(validatedData.platforms || [])},
        ${validatedData.timeline}, ${validatedData.budget}, ${validatedData.priority},
        ${validatedData.hasDesigns}, ${validatedData.hasContent}, ${validatedData.needsHosting},
        ${validatedData.needsMaintenance}, ${validatedData.additionalNotes || null}
      )
      RETURNING id, created_at
    `

    // Track analytics
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    await sql`
      INSERT INTO analytics_events (event_type, page_path, ip_address, user_agent, metadata)
      VALUES ('project_request_submission', '/request-project', ${ip}, ${userAgent}, 
              ${JSON.stringify({ project_type: validatedData.projectType, budget: validatedData.budget })})
    `

    return NextResponse.json({
      success: true,
      message: "Project request submitted successfully!",
      requestId: result[0].id,
    })
  } catch (error) {
    console.error("Project request error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
