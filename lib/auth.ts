import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

export function verifyAdminToken(request: NextRequest): boolean {
  try {
    const token = request.cookies.get("admin-token")?.value

    if (!token) {
      return false
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      return false
    }

    const decoded = jwt.verify(token, jwtSecret) as any
    return decoded.admin === true
  } catch (error) {
    return false
  }
}

export function requireAdmin(handler: Function) {
  return async (request: NextRequest) => {
    if (!verifyAdminToken(request)) {
      return new Response("Unauthorized", { status: 401 })
    }

    return handler(request)
  }
}
