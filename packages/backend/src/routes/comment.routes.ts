import { Hono } from "hono";
import { addComment } from "../controllers/comment/add.controller";

const commentRouter = new Hono();

commentRouter.post("/add", addComment);

export { commentRouter };
