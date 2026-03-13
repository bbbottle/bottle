import { Context } from 'hono';

export const listPosts = async (c: Context) => {
  try {
    const { results } = await c.env.DB.prepare(
      `SELECT id, title, content, author, created_at as createdAt, updated_at as updatedAt
       FROM posts
       ORDER BY created_at DESC`
    ).all();

    return c.json({
      status: 'success',
      data: results,
    });
  } catch (error: any) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to fetch posts',
        error: error.message,
      },
      500
    );
  }
};
