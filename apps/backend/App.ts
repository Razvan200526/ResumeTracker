import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

export const app = new Hono();
app.use(logger(), cors());
