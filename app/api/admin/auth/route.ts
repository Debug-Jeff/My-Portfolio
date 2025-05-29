import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = loginSchema.parse(body)

    const hashedPassword = process.env.ADMIN_PASSWORD_HASH
    const jwtSecret = process.env.JWT_SECRET

    if (!hashedPassword || !jwtSecret) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const isValid = await bcrypt.compare(password, hashedPassword)

    if (!isValid) {
      // Log failed attempt
      console.log(`Failed admin login attempt from IP: ${request.ip || "unknown"}`)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = jwt.sign(
      {
        admin: true,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      },
      jwtSecret,
    )

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    })

    // Set HTTP-only cookie
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Admin auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("admin-token")
  return response
}
