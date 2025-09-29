import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';
import { authService } from '../services/AuthService';

@Route('GET', '/api/auth/signout', 'Logout the current user')
export class SignoutController {
  async handler(c: Context) {
    try {
      const result = await authService.signOut(c.req.raw.headers);

      c.header(
        'Set-Cookie',
        'auth-session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure',
      );

      return c.json({ success: result.success, data: null });
    } catch (e) {
      console.error('Signout error:', e);
      return c.json({ success: false, error: 'Signout failed' }, 500);
    }
  }
}
