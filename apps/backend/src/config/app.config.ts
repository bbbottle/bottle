import { Hono } from 'hono';
import type { D1Database } from '@cloudflare/workers-types';
import { cors } from 'hono/cors';

type Bindings = {
  DB: D1Database;
  API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  '*',
  cors({
    origin: '*',
  })
);

export default app;
