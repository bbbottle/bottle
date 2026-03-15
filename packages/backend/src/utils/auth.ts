import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

/**
 * Timing-safe string comparison to prevent timing attacks
 */
export const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

/**
 * Validate API Key from request header
 * Returns true if valid, false otherwise
 */
export const validateApiKey = (c: Context): boolean => {
  const apiKey = c.req.header('x-api-key');
  const streamApiKey = c.env?.STREAM_API_KEY;

  if (!apiKey || !streamApiKey) {
    return false;
  }

  return timingSafeEqual(apiKey, streamApiKey);
};

/**
 * Middleware to require API Key authentication
 * Throws HTTPException 401 if invalid
 */
export const requireAuth = async (c: Context, next: () => Promise<void>) => {
  if (!validateApiKey(c)) {
    throw new HTTPException(401, { message: 'Invalid API key' });
  }
  await next();
};
