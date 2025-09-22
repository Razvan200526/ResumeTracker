import { app } from "./App";
try {
  Bun.serve({
    port: 2000,
    fetch: app.fetch,
  });
  console.log("Server started on port 2000");
} catch (e) {
  if (e instanceof Error) {
    throw new Error(e.message);
  }
  console.error(e);
}
