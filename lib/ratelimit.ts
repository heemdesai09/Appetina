// Simple in-memory rate limiter
// For production, consider using Redis-based rate limiting

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

export const rateLimit = (
  identifier: string,
  config: RateLimitConfig = { windowMs: 60000, maxRequests: 10 }
): { allowed: boolean; remaining: number; resetTime: number } => {
  const now = Date.now();
  const record = store[identifier];

  // Clean up expired entries
  if (record && now > record.resetTime) {
    delete store[identifier];
  }

  // Check if identifier exists
  if (!store[identifier]) {
    store[identifier] = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: store[identifier].resetTime,
    };
  }

  // Increment counter
  store[identifier].count++;

  const allowed = store[identifier].count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - store[identifier].count);

  return {
    allowed,
    remaining,
    resetTime: store[identifier].resetTime,
  };
};

export const getClientIdentifier = (request: Request): string => {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }

  // Fallback to a combination of user agent and accept language
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const acceptLanguage = request.headers.get('accept-language') || 'unknown';
  
  return `${userAgent}-${acceptLanguage}`.substring(0, 100);
};
