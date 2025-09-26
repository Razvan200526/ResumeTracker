import { AuthService } from '@backend/auth/services/AuthService';
import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';

const authService = new AuthService(process.env.DATABASE_URL || '');

@Route('GET', '/api/auth/signout', 'Logout the current user')
export class SignoutController {
  async handler(c: Context) {
    const result = await authService.signOut(c.req.raw.headers);
    return c.json({ success: true, data: result ?? null });
  }
}
