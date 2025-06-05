import { NextResponse } from "next/server"
import { z } from "zod"
import rateLimit from "@/lib/rate-limit"

const limiter = rateLimit({
  interval: 60000, // 60 seconds
  uniqueTokenPerInterval: 500,
})

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(1000),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      )
    }

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "anonymous"
    const rateLimited = await limiter.check(request, 5, `contact_${ip}`)
    if (rateLimited.status === 429) {
      return rateLimited
    }

    // Process contact form (e.g., send email, store in database)
    // Add your implementation here

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
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
