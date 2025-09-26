import { app } from './App';

try {
  Bun.serve({
    port: 2000,
    fetch: app.fetch,
  });
} catch (e) {
  if (e instanceof Error) {
    throw new Error(e.message);
  }
  console.error(e);
}
