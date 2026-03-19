import { Context } from 'hono';

export const listStreaming = async (c: Context) => {
  try {
    // Parse query parameters
    // 'before' - fetch records older than this ID (for pagination / next page)
    // 'after' - fetch records newer than this ID (for polling / new messages)
    // 'offset' - number of records to fetch (default: 8, max: 100)
    const before = c.req.query('before');
    const after = c.req.query('after');
    const offset = Math.min(parseInt(c.req.query('offset') || '8', 10), 100);

    let results;

    if (before) {
      // Fetch records older than the specified id (pagination - next page)
      const { results: cursorResults } = await c.env.DB.prepare(
        `SELECT id, author, content, type, created_at as createdAt
         FROM streaming
         WHERE created_at < (SELECT created_at FROM streaming WHERE id = ?)
         ORDER BY created_at DESC
         LIMIT ?`
      )
        .bind(before, offset)
        .all();
      results = cursorResults;
    } else if (after) {
      // Fetch records newer than the specified id (polling - new messages)
      // Return in ascending order so client can unshift them in order
      const { results: cursorResults } = await c.env.DB.prepare(
        `SELECT id, author, content, type, created_at as createdAt
         FROM streaming
         WHERE created_at > (SELECT created_at FROM streaming WHERE id = ?)
         ORDER BY created_at ASC
         LIMIT ?`
      )
        .bind(after, offset)
        .all();
      results = cursorResults;
    } else {
      // Fetch the most recent records
      const { results: recentResults } = await c.env.DB.prepare(
        `SELECT id, author, content, type, created_at as createdAt
         FROM streaming
         ORDER BY created_at DESC
         LIMIT ?`
      )
        .bind(offset)
        .all();
      results = recentResults;
    }

    return c.json({
      status: 'success',
      data: results,
    });
  } catch (error: any) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to fetch streaming',
        error: error.message,
      },
      500
    );
  }
};
