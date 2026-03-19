import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

export const removePost = async (c: Context) => {
  try {
    const id = c.req.param('id');

    if (!id) {
      throw new HTTPException(400, { message: 'Post ID is required' });
    }

    // Check database availability
    if (!c.env?.DB) {
      throw new HTTPException(503, { message: 'Database unavailable' });
    }

    // Check if post exists
    const existingPost = await c.env.DB.prepare('SELECT id FROM posts WHERE id = ?')
      .bind(id)
      .first();

    if (!existingPost) {
      throw new HTTPException(404, { message: 'Post not found' });
    }

    // Delete post
    await c.env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(id).run();

    return c.json({
      status: 'success',
      message: 'Post deleted successfully',
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
