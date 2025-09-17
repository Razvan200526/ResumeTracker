import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

export const app = new Hono();
app.use(cors(), logger());

// API routes (add your API endpoints here)
app.get("/api/health", (c) => {
	return c.json({ status: "ok", message: "Resume Tracker API" });
});

// Serve built static files from the expected path
app.use(
	"/shared/public/dist/*",
	serveStatic({
		root: "./apps/frontend",
		rewriteRequestPath: (path) =>
			path.replace("/shared/public/dist", "/shared/public/dist"),
	}),
);

// Serve index.html for all non-API routes (SPA routing)
app.get("*", async (c) => {
	return c.html(await Bun.file("./apps/frontend/__init__/index.html").text());
});
