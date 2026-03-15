import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

interface AddPostRequest {
  title: string;
  content: string;
  author?: string;
}

const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 100000;

export const addPost = async (c: Context) => {
  try {
    // Parse and validate request body
    const body = await c.req.json<AddPostRequest>();

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

    // Insert post
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    try {
      await c.env.DB.prepare(
        'INSERT INTO posts (id, title, content, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
      )
        .bind(id, title, content, author, now, now)
        .run();
    } catch (dbError: any) {
      if (dbError.message?.includes('UNIQUE')) {
        throw new HTTPException(409, { message: 'Post with this title already exists' });
      }
      throw dbError;
    }

    return c.json(
      {
        status: 'success',
        data: { id, title, content, author, createdAt: now, updatedAt: now },
      },
      201
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
