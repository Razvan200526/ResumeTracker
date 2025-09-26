import { AuthService } from '@backend/auth/services/AuthService';
import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';

const authService = new AuthService(process.env.DATABASE_URL || '');

@Route('POST', '/api/auth/signin/email', 'Handle email signin')
export class SigninEmailController {
  async handler(c: Context) {
    const payload = await c.req.json();

    const result = await authService.signInEmail(payload, c.req.raw.headers);
    const cookie = result.headers.get('Set-Cookie') ?? '';
    if (cookie) c.header('Set-Cookie', cookie);

    return c.json({ user: result.response.user, success: true });
  }
}
