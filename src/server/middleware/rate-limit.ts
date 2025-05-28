const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);

interface RateLimitData {
  count: number;
  resetTime: number;
}

const ipRequestCounts = new Map<string, RateLimitData>();

// Clean up expired rate limit data periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestCounts.entries()) {
    if (now > data.resetTime) {
      ipRequestCounts.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

export const rateLimit = async (req: Request): Promise<void> => {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  
  const requestData = ipRequestCounts.get(ip) || {
    count: 0,
    resetTime: now + RATE_LIMIT_WINDOW_MS
  };

  if (now > requestData.resetTime) {
    // Reset counter if window has expired
    requestData.count = 1;
    requestData.resetTime = now + RATE_LIMIT_WINDOW_MS;
  } else if (requestData.count >= RATE_LIMIT_MAX_REQUESTS) {
    throw new Error('Rate limit exceeded');
  } else {
    requestData.count++;
  }

  ipRequestCounts.set(ip, requestData);
}; 