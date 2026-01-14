import { Context } from "hono";

export const addComment = async (c: Context) => {
  const { articleId, author, content } = await c.req.json();

  try {
    let { results } = await c.env.DB.prepare(
      "INSERT INTO comment (article_id, author, content, created_at) VALUES (?, ?, ?, ?);",
    )
      .bind(articleId, author, content, new Date().toISOString())
      .run();

    return c.json({
      status: "success",
      message: "Comment added successfully",
      results,
    });
  } catch (error: any) {
    return c.json({
      status: "error",
      message: "Failed to add comment",
      error: error.message,
    });
  }
};
