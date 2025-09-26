import { AuthService } from '@backend/auth/services/AuthService';
import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';

const authService = new AuthService(process.env.DATABASE_URL || '');

@Route(
  'POST',
  '/api/auth/forget-password/email',
  'Handle email forget password',
)
export class ForgetPasswordEmailController {
  async handler(c: Context) {
    const payload = await c.req.json();
    const result = await authService.sendForgetPasswordEmail(payload.email);
    return c.json({ success: true, data: result ?? null });
  }
}
