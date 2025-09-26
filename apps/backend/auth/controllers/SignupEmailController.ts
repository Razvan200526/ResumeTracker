import { AuthService } from '@backend/auth/services/AuthService';
import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';

const authService = new AuthService(process.env.DATABASE_URL || '');

@Route('POST', '/api/auth/signup/email', 'Handle email signup')
export class SignupEmailController {
  async handler(c: Context) {
    const payload = await c.req.json();

    await authService.signup({
      firstName: payload.firstName || payload.email?.split('@')[0] || 'User',
      lastName: payload.lastName || payload.email?.split('@')[0] || 'User',
      email: payload.email,
      password: payload.password,
      roles: payload.roles || ['ROLE_USER'],
      country: payload.country,
      field: payload.field,
      university: payload.university,
      year: payload.year,
      image: payload.image,
    });

    const result = await authService.sendVerificationEmail(payload.email, 'en');

    return c.json({ success: true, data: result ?? null });
  }
}
