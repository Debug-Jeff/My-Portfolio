import { LRUCache } from 'lru-cache'
import { NextResponse } from 'next/server'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (request: Request, limit: number, token: string) =>
      checkRateLimit(request, limit, token, tokenCache),
  }
}

async function checkRateLimit(
  request: Request,
  limit: number,
  token: string,
  tokenCache: LRUCache<string, number[]>
) {
  const tokenCount = (await tokenCache.get(token)) || [0]
  if (tokenCount[0] === 0) {
    await tokenCache.set(token, [1])
    return NextResponse.json({ success: true })
  }
  tokenCount[0] += 1

  await tokenCache.set(token, tokenCount)

  const currentUsage = tokenCount[0]
  const isRateLimited = currentUsage >= limit

  return isRateLimited
    ? NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
    : NextResponse.json({ success: true })
}

// Rate limit configurations
export const rateLimitConfig = {
  default: { requests: 60, window: 60 }, // 60 requests per minute
  contact: { requests: 5, window: 300 }, // 5 requests per 5 minutes
  project: { requests: 3, window: 300 }, // 3 requests per 5 minutes
}
