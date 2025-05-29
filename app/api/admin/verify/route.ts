import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const decoded = jwt.verify(token, jwtSecret) as { admin: boolean; exp: number }

    if (!decoded.admin) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    return NextResponse.json({ success: true, admin: true })
  } catch (error) {
    console.error("Token verification failed:", error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }
}
