import { app } from "./server";

const server = Bun.serve({
	port: Bun.env.PORT || 3000,
	fetch: app.fetch,
});

if (!server) {
	console.error("Failed to start server");
}
