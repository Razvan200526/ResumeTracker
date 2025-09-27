import { authService } from '@backend/auth/services/AuthService';
import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';

@Route('POST', '/api/auth/signup/email', 'Handle email signup')
export class SignupEmailController {
  async handler(c: Context) {
    const payload = await c.req.json();
    const response = await authService.signup({
      ...payload,
    });

    const result = await authService.sendVerificationEmail(payload.email);

    return c.json({ success: true, data: result ?? null, user: response });
  }
}
