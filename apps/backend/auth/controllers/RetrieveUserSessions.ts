import { Route } from '@backend/decorators/Route';
import { userSessionRepository } from '@backend/user/repositories/UserSessionRepository';
import type { Context } from 'hono';

@Route('GET', '/api/auth/user-sessions/:id', 'Retrieve User Sessions')
export class RetrieveUserSessionsControlle {
  private readonly userSessionRepository;
  constructor() {
    this.userSessionRepository = userSessionRepository;
  }
  async handler(c: Context) {
    const id = await c.req.param('id');
    const session = await this.userSessionRepository.findOneOrFail(id);

    return c.json(session);
  }
}
