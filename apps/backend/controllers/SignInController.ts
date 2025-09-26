import { userRepository } from '@backend/user/repositories/UserRepository';
import { isEmailValid } from '@common/validators/isEmailValid';
import { isUserPasswordValid } from '@common/validators/isUserPasswordValid';
import type { Context } from 'hono';
import { Route } from '../decorators/Route';

@Route('POST', '/api/auth/signin/email', 'Handles user sign-in')
export class SignInController {
  async handler(c: Context) {
    const { email, password } = await c.req.json();
    if (!isEmailValid(email) || !isUserPasswordValid(password)) {
      return c.json({ error: 'Invalid email or password' }, 400);
    }

    const user = await userRepository.findOneByOrFail({
      email: email,
      password: password,
    });
    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 400);
    }

    // You might want to return user info or a token here
    return c.json({ message: 'Sign-in successful', user });
  }
}
