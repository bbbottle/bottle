import { Hono } from "hono";
import type { D1Database } from "@cloudflare/workers-types";
import { cors } from "hono/cors";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post(
  "/comment/add",
  cors({
    origin: ["https://bbki.ng"],
  }),
  async (c) => {
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
  },
);

export default app;
