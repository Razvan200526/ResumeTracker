import { Route } from '@backend/decorators/Route';
import { userRepository } from '@backend/repositories/UserRepository';
import { isEmailValid } from '@common/validators/isEmailValid';

import type { Context } from 'hono';

const url = 'http://localhost:2000';

@Route('POST', '/api/user-exists', 'Checks if a user exists')
export class CheckUserExistsController {
  async handler(c: Context) {
    const { email } = await c.req.json();
    if (!isEmailValid(email)) {
      return c.json(
        {
          data: {
            exists: false,
            message: 'Invalid email',
            success: false,
            status: 400,
            isClientError: true,
            isServerError: false,
            isNotFound: false,
            isUnauthorized: false,
            isForbidden: false,
            app: {
              url,
            },
          },
        },
        400,
      );
    }
    let user: any;
    try {
      user = await userRepository.findByEmail(email);
    } catch (e: any) {
      console.error('Error in findByEmail:', e);
      return c.json(
        { error: 'Failed to check user existence', details: e.message },
        500,
      );
    }

    if (user) {
      return c.json(
        {
          data: {
            exists: true,
            message: 'User exists,try another email',
            success: true,
            status: 400,
            isClientError: true,
            isServerError: false,
            isNotFound: false,
            isUnauthorized: false,
            isForbidden: false,
            app: {
              url,
            },
          },
        },
        400,
      );
    }
    return c.json(
      {
        data: {
          exists: false,
          succes: true,
          status: 200,
          isClientError: false,
          isServerError: false,
          isNotFound: false,
          isUnauthorized: false,
          isForbidden: false,
          app: {
            url,
          },
        },
      },
      200,
    );
  }
}
