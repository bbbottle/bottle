import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

export const removeStreaming = async (c: Context) => {
  try {
    // 0. Environment check
    const streamApiKey = c.env?.STREAM_API_KEY;
    if (!streamApiKey) {
      console.error('STREAM_API_KEY not configured in environment');
      throw new HTTPException(500, { message: 'Server configuration error' });
    }

    // 1. Authentication (Header method)
    const apiKey = c.req.header('x-api-key');
    if (!apiKey || !timingSafeEqual(apiKey, streamApiKey)) {
      throw new HTTPException(401, { message: 'Invalid API key' });
    }

    // 2. Get ID from URL params
    const id = c.req.param('id');
    if (!id) {
      throw new HTTPException(400, { message: 'ID is required' });
    }

    // 3. Database check
    if (!c.env?.DB) {
      throw new HTTPException(503, { message: 'Database unavailable' });
    }

    // 4. Check if stream exists
    const existing = await c.env.DB.prepare('SELECT id FROM streaming WHERE id = ?')
      .bind(id)
      .first();

    if (!existing) {
      throw new HTTPException(404, { message: 'Stream not found' });
    }

    // 5. Delete the stream
    await c.env.DB.prepare('DELETE FROM streaming WHERE id = ?').bind(id).run();

    return c.json(
      {
        status: 'success',
        message: 'Stream deleted successfully',
      },
      200
    );
  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ status: 'error', message: error.message }, error.status);
    }

    console.error('Unexpected error:', error);
    return c.json(
      {
        status: 'error',
        message: 'Internal server error',
      },
      500
    );
  }
};
