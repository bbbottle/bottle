import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

interface UpdatePostRequest {
  title: string;
  content: string;
  author?: string;
}

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 100000;

export const updatePost = async (c: Context) => {
  try {
    const id = c.req.param('id');

    if (!id) {
      throw new HTTPException(400, { message: 'Post ID is required' });
    }

    // Parse and validate request body
    const body = await c.req.json<UpdatePostRequest>();

    if (!body.title || typeof body.title !== 'string') {
      throw new HTTPException(400, { message: 'Title is required' });
    }

    if (!body.content || typeof body.content !== 'string') {
      throw new HTTPException(400, { message: 'Content is required' });
    }

    const title = body.title.trim();
    const content = body.content.trim();

    if (title.length === 0) {
      throw new HTTPException(400, { message: 'Title cannot be empty' });
    }

    if (title.length > MAX_TITLE_LENGTH) {
      throw new HTTPException(413, { message: `Title exceeds ${MAX_TITLE_LENGTH} chars` });
    }

    if (content.length === 0) {
      throw new HTTPException(400, { message: 'Content cannot be empty' });
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      throw new HTTPException(413, { message: `Content exceeds ${MAX_CONTENT_LENGTH} chars` });
    }

    const author = (body.author ?? 'bbki.ng').trim();

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

    // Update post
    const now = new Date().toISOString();

    try {
      await c.env.DB.prepare(
        'UPDATE posts SET title = ?, content = ?, author = ?, updated_at = ? WHERE id = ?'
      )
        .bind(title, content, author, now, id)
        .run();
    } catch (dbError: any) {
      if (dbError.message?.includes('UNIQUE')) {
        throw new HTTPException(409, { message: 'Post with this title already exists' });
      }
      throw dbError;
    }

    return c.json({
      status: 'success',
      data: { id, title, content, author, updatedAt: now },
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
