import { Route } from '@backend/decorators/Route';
import { isEmailValid } from '@common/validators/isEmailValid';
import { isUserPasswordValid } from '@common/validators/isUserPasswordValid';
import type { Context } from 'hono';
import { type AuthService, authService } from '../services/AuthService';

@Route(
  'POST',
  '/api/auth/signin/email',
  'Sign in a user with email and password',
)
export class SignInController {
  private authService: AuthService;
  constructor() {
    this.authService = authService;
  }
  async handler(c: Context) {
    const { email, password } = await c.req.json();
    if (!isEmailValid(email)) {
      return c.json({ error: 'Invalid email' }, 400);
    }
    if (!isUserPasswordValid(password)) {
      return c.json({ error: 'Invalid password' }, 400);
    }
    try {
      const result = await this.authService.signInEmail(
        { email, password },
        c.req.raw.headers,
      );

      const setCookieHeader = result.headers.get('Set-Cookie');
      if (setCookieHeader) {
        c.header('Set-Cookie', setCookieHeader);
      }

      return c.json({ data: { user: result.response.user }, success: true });
    } catch (e: any) {
      return c.json({ error: e.message }, 400);
    }
  }
}
