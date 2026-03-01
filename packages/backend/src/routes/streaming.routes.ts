import { Hono } from "hono";
import { listStreaming } from "../controllers/streaming/list.controller";

const streamingRouter = new Hono();

streamingRouter.get("/", listStreaming);

export { streamingRouter };
