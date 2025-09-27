import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';
import { authService } from '../services/AuthService';

@Route('POST', '/api/auth/signup/check-otp', 'Check OTP on signup')
export class SignupCheckOtpController {
  async handler(c: Context) {
    const payload = await c.req.json();
    const result = await authService.verifyEmailOTP(payload.email, payload.otp);

    return c.json({ success: true, data: result ?? null });
  }
}
