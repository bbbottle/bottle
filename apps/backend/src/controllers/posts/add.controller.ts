import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import showdown from 'showdown';

const converter = new showdown.Converter();
converter.setFlavor('github');

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
    const body = (await c.req.json()) as AddPostRequest;

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

    // Convert markdown to HTML
    const html = converter.makeHtml(content);
    const wrappedHtml = html.includes('<p>') ? html : `<p>${html}</p>`;

    // Check database availability
    if (!c.env?.DB) {
      throw new HTTPException(503, { message: 'Database unavailable' });
    }

    const now = new Date().toISOString();

    // Check if post with same title already exists (upsert)
    const existingPost = (await c.env.DB.prepare('SELECT id FROM posts WHERE title = ?')
      .bind(title)
      .first()) as { id: string } | null;

    if (existingPost) {
      await c.env.DB.prepare(
        'UPDATE posts SET content = ?, author = ?, updated_at = ? WHERE id = ?'
      )
        .bind(wrappedHtml, author, now, existingPost.id)
        .run();

      return c.json({
        status: 'success',
        data: { id: existingPost.id, title, content: wrappedHtml, author, updatedAt: now },
      });
    }

    // Insert new post
    const id = crypto.randomUUID();

    await c.env.DB.prepare(
      'INSERT INTO posts (id, title, content, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    )
      .bind(id, title, wrappedHtml, author, now, now)
      .run();

    return c.json(
      {
        status: 'success',
        data: { id, title, content: wrappedHtml, author, createdAt: now, updatedAt: now },
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
