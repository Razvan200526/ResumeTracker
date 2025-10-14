import { Route } from '@backend/decorators/Route';
import { ResumeEntity } from '@backend/resources/resumes/ResumeEntity';
import {
  type PrimaryDatabase,
  primaryDatabase,
} from '@backend/shared/database/PrimaryDatabase';
import type { Context } from 'hono';

@Route('GET', '/api/resume/:id', 'Get resume by id')
export class GetResumeController {
  private database: PrimaryDatabase;
  constructor() {
    this.database = primaryDatabase;
  }
  async handler(c: Context) {
    const id = c.req.param('id');

    const resumeRepo = await this.database.open(ResumeEntity);

    const resume = await resumeRepo.findOne({
      where: { id: id },
    });

    if (!resume) {
      return c.json({
        data: {},
        message: 'Resume not found',
        isClientError: true,
        isServerError: true,
        app: {
          url: 'http://localhost:3000',
        },
      });
    }
    return c.json({
      data: resume,
      message: 'Resume found',
      isClientError: false,
      isServerError: false,
      app: {
        url: 'http://localhost:3000',
      },
    });
  }
}
