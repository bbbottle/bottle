import { Hono } from "hono";
import { listStreaming } from "../controllers/streaming/list.controller";
import { addStreaming } from "../controllers/streaming/add.controller";

const streamingRouter = new Hono();

streamingRouter.get("/", listStreaming);
streamingRouter.post("/", addStreaming);

export { streamingRouter };
