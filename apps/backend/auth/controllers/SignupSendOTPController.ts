import { authService } from '@backend/auth/services/AuthService';
import { Route } from '@backend/decorators/Route';
import { isEmailValid } from '@common/validators/isEmailValid';
import type { Context } from 'hono';

@Route('POST', '/api/auth/signup/send-otp', 'Sends OTP on mail')
export class SignupSendOTPController {
  async handler(c: Context) {
    try {
      const { email } = await c.req.json();
      if (!isEmailValid(email)) {
        return c.json({ error: 'Invalid email', success: false }, 400);
      }

      await authService.sendVerificationEmail(email);

      return c.json({ success: true });
    } catch (e) {
      console.error('Error in signup/send-otp:', e);
      return c.json({ success: false, error: 'Failed to send OTP' }, 500);
    }
  }
}
