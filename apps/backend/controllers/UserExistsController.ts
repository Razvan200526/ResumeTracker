import { Route } from '@backend/decorators/Route';
import { userRepository } from '@backend/user/repositories/UserRepository';
import { isEmailValid } from '@common/validators/isEmailValid';

import type { Context } from 'hono';

const url = 'http:/localhost:2000';

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
    const user = await userRepository.findByEmail(email);
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
