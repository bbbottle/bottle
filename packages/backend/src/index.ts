import app from "./config/app.config";

import { commentRouter } from "./routes/comment.routes";
import { authRoutes } from "./routes/authn.routes";

app.route("comment", commentRouter);
app.route("auth", authRoutes);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
