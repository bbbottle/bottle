import { Hono } from "hono";
import type { D1Database } from "@cloudflare/workers-types";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/comment/add", async (c) => {
  const { articleId, author, content } = await c.req.json();

  try {
    let { results } = await c.env.DB.prepare(
      `INSERT INTO comment (article_id, author, content) VALUES (${articleId}, ${author}, ${content})`,
    ).run();

    return c.json({
      status: "success",
      message: "Comment added successfully",
      results,
    });
  } catch (error) {
    return c.json({ status: "error", message: "Failed to add comment", error });
  }
});

export default app;
