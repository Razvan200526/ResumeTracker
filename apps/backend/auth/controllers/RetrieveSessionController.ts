import { AuthService } from '@backend/auth/services/AuthService';
import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';

const authService = new AuthService(process.env.DATABASE_URL || '');

@Route('GET', '/api/auth/session', 'Retrieve the current session')
export class RetrieveSessionController {
  async handler(c: Context) {
    const session = await authService.getSession(c.req.raw.headers);
    return c.json({ user: session?.user ?? null });
  }
}
