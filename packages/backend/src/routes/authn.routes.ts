import { Hono } from "hono";
import { registerOptions } from "../controllers/authn/register.controller";
import { verify } from "../controllers/authn/verify.controller";

const authRoutes = new Hono();

authRoutes.post("/register/options", registerOptions);
authRoutes.post("/register/verify", verify);

export { authRoutes };
