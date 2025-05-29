import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { neon } from "@neondatabase/serverless"
import { rateLimit, rateLimitConfigs } from "@/lib/rate-limit"

const sql = neon(process.env.DATABASE_URL!)

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = await rateLimit(request, rateLimitConfigs.contact)

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please try again later.",
        retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      },
    )
  }

  // Rest of the existing POST logic...
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Get client info
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Insert into database
    const result = await sql`
      INSERT INTO contact_messages (name, email, subject, message, ip_address, user_agent)
      VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.subject}, ${validatedData.message}, ${ip}, ${userAgent})
      RETURNING id, created_at
    `

    // Track analytics event
    await sql`
      INSERT INTO analytics_events (event_type, page_path, ip_address, user_agent, metadata)
      VALUES ('contact_form_submission', '/contact', ${ip}, ${userAgent}, ${JSON.stringify({ subject: validatedData.subject })})
    `

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      id: result[0].id,
    })
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication (we'll implement this next)
    const messages = await sql`
      SELECT id, name, email, subject, message, status, created_at, updated_at
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT 50
    `

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
