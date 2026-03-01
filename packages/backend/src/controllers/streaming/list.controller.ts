import { Context } from "hono";

export const listStreaming = async (c: Context) => {
  try {
    const { results } = await c.env.DB.prepare(
      "SELECT id, author, content, type, created_at as createdAt FROM streaming ORDER BY created_at DESC LIMIT 100"
    ).all();

    return c.json({
      status: "success",
      data: results,
    });
  } catch (error: any) {
    return c.json({
      status: "error",
      message: "Failed to fetch streaming",
      error: error.message,
    }, 500);
  }
};
