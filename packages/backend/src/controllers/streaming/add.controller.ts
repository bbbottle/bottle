import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

interface AddStreamingRequest {
  author?: string;
  content: string;
  type?: 'note' | 'article' | 'link' | 'image';
}

const MAX_CONTENT_LENGTH = 50000;
const ALLOWED_TYPES = ['note', 'article', 'link', 'image'] as const;

const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

export const addStreaming = async (c: Context) => {
  try {
    // 1. 认证（Header 方式）
    const apiKey = c.req.header('x-api-key');
    if (!apiKey || !timingSafeEqual(apiKey, c.env.STREAM_API_KEY)) {
      throw new HTTPException(401, { message: "Invalid API key" });
    }

    // 2. 解析与验证
    const body = await c.req.json<AddStreamingRequest>();
    
    if (!body.content || typeof body.content !== "string") {
      throw new HTTPException(400, { message: "Content is required" });
    }
    
    const content = body.content.trim();
    if (content.length === 0) {
      throw new HTTPException(400, { message: "Content cannot be empty" });
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      throw new HTTPException(413, { message: `Content exceeds ${MAX_CONTENT_LENGTH} chars` });
    }

    const author = (body.author ?? 'bbki.ng').trim();
    if (author.length > 50) {
      throw new HTTPException(400, { message: "Author too long" });
    }

    const type = body.type?.trim();
    if (type && !ALLOWED_TYPES.includes(type as typeof ALLOWED_TYPES[number])) {
      throw new HTTPException(400, { message: "Invalid type" });
    }

    // 3. 数据库检查
    if (!c.env?.DB) {
      throw new HTTPException(503, { message: "Database unavailable" });
    }

    // 4. 写入
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    try {
      await c.env.DB.prepare(
        "INSERT INTO streaming (id, author, content, type, created_at) VALUES (?, ?, ?, ?, ?)"
      )
        .bind(id, author, content, type || null, createdAt)
        .run();
    } catch (dbError) {
      if (dbError instanceof Error && dbError.message.includes('UNIQUE')) {
        throw new HTTPException(409, { message: "Duplicate entry" });
      }
      throw dbError;
    }

    return c.json({
      status: "success",
      data: { id, author, content, type, createdAt }
    }, 201);

  } catch (error) {
    if (error instanceof HTTPException) {
      return c.json({ status: "error", message: error.message }, error.status);
    }
    
    console.error('Unexpected error:', error);
    return c.json({ 
      status: "error", 
      message: "Internal server error" 
    }, 500);
  }
};