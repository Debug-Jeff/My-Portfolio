import { Redis } from "@upstash/redis"
import type { NextRequest } from "next/server"

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export interface RateLimitConfig {
  requests: number
  window: number // in seconds
  identifier?: (request: NextRequest) => string
}

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig,
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const identifier = config.identifier
    ? config.identifier(request)
    : request.ip || request.headers.get("x-forwarded-for") || "anonymous"

  const key = `rate_limit:${identifier}`
  const window = config.window * 1000 // Convert to milliseconds
  const now = Date.now()

  try {
    // Get current count
    const current = (await redis.get(key)) as number | null

    if (current === null) {
      // First request in window
      await redis.setex(key, config.window, 1)
      return {
        success: true,
        remaining: config.requests - 1,
        reset: now + window,
      }
    }

    if (current >= config.requests) {
      // Rate limit exceeded
      const ttl = await redis.ttl(key)
      return {
        success: false,
        remaining: 0,
        reset: now + ttl * 1000,
      }
    }

    // Increment counter
    await redis.incr(key)

    return {
      success: true,
      remaining: config.requests - current - 1,
      reset: now + window,
    }
  } catch (error) {
    console.error("Rate limiting error:", error)
    // Fail open - allow request if Redis is down
    return {
      success: true,
      remaining: config.requests - 1,
      reset: now + window,
    }
  }
}

// Predefined rate limit configurations
export const rateLimitConfigs = {
  contact: { requests: 5, window: 300 }, // 5 requests per 5 minutes
  projectRequest: { requests: 2, window: 3600 }, // 2 requests per hour
  admin: { requests: 10, window: 900 }, // 10 requests per 15 minutes
  api: { requests: 100, window: 3600 }, // 100 requests per hour
}
