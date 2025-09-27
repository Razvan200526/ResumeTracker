import { Route } from '@backend/decorators/Route';
import type { Context } from 'hono';
import { retrieveCurrentUserService } from '../services/RetrieveCurrentUserService';

@Route('GET', '/api/auth/session', 'Retrieve the current session')
export class RetrieveSessionController {
  async handler(c: Context) {
    const jwtPayload = c.get('jwtPayload'); // Assuming jwtPayload is set by middleware
    if (!jwtPayload || !jwtPayload.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const userId = jwtPayload.userId;

    var u: any;
    try {
      const user = await retrieveCurrentUserService.retrieve(userId);
      u = user;
    } catch (e) {
      console.error(e);
      return c.json({ error: 'Failed to retrieve session' }, 500);
    }

    return c.json({ data: u, success: true });
  }
}
