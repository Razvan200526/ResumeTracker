import { app } from './App';
import { PrimaryDatabase } from './shared/database/PrimaryDatabase';

async function initializeDatabase() {
  try {
    const database = new PrimaryDatabase();
    const source = database.getSource();
    await source.initialize();
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1); // Exit if database fails to initialize
  }
}

async function startServer() {
  await initializeDatabase();

  try {
    Bun.serve({
      port: 2000,
      fetch: app.fetch,
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error('Error starting server:', e.message);
    }
    console.error(e);
    process.exit(1);
  }
}

startServer();
