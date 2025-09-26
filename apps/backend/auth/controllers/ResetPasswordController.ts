import { AuthService } from '@backend/auth/services/AuthService';
import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';

const authService = new AuthService(process.env.DATABASE_URL || '');

@Route('POST', '/api/auth/reset-password', 'Reset user password')
export class ResetPasswordController {
  async handler(c: Context) {
    const payload = await c.req.json();
    const result = await authService.resetPassword(payload);
    return c.json({ success: true, data: result ?? null });
  }
}
