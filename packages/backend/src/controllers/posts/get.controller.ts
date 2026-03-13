import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const getPost = async (c: Context) => {
  try {
    const title = c.req.param('title');

    if (!title) {
      throw new HTTPException(400, { message: 'Title is required' });
    }

    const result = await c.env.DB.prepare(
      `SELECT id, title, content, author, created_at as createdAt, updated_at as updatedAt
       FROM posts
       WHERE title = ?`
    )
      .bind(title)
      .first();

    if (!result) {
      throw new HTTPException(404, { message: 'Post not found' });
    }

    return c.json({
      status: 'success',
      data: result,
    });
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
