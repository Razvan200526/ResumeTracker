import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { SignUpController } from './routes/CreateUserController';
import { SignInController } from './routes/SignInController';
import { registerController } from './shared/registerController';
export const app = new Hono();
app.use(logger());
app.use(
  cors({
    origin: 'http://localhost:3000',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);

registerController(app, SignUpController);
registerController(app, SignInController);
app.get('/health', (c) => c.json({ status: 'ok' }));
