import { SignupEmailController } from '@backend/auth/controllers/SignupEmailController';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

export const app = new Hono();
app.use(logger());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://pub-6858952ca1f64c08a3e778080d6e2ee6.r2.dev',
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.post('/api/auth/signup', async (c) => {
  const ctrl = new SignupEmailController();
  return await ctrl.handler(c);
});

app.get('/health', (c) => c.json({ status: 'ok' }));
