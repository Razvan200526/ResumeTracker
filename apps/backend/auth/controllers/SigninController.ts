import { Route } from '@backend/decorators/Route';
import { isEmailValid } from '@common/validators/isEmailValid';
import { isUserPasswordValid } from '@common/validators/isUserPasswordValid';
import type { Context } from 'hono';
import { authService } from '../services/AuthService';

@Route(
  'POST',
  '/api/auth/signin/email',
  'Sign in a user with email and password',
)
export class SignInController {
  async handler(c: Context) {
    const { email, password } = await c.req.json();
    if (!isEmailValid(email)) {
      return c.json({ error: 'Invalid email' }, 400);
    }
    if (!isUserPasswordValid(password)) {
      return c.json({ error: 'Invalid password' }, 400);
    }
    try {
      const user = await authService.signInEmail({ email, password });
      return c.json({ data: { user }, success: true });
    } catch (e: any) {
      return c.json({ error: e.message }, 400);
    }
  }
}
