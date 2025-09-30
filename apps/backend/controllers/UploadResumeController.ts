import { Route } from '@backend/decorators/Route';
import { ResumeEntity } from '@backend/resources/resumes/ResumeEntity';
import {
  type StorageService,
  storageService,
} from '@backend/service/StorageService';
import {
  type PrimaryDatabase,
  primaryDatabase,
} from '@backend/shared/database/PrimaryDatabase';
import type { Context } from 'hono';

@Route('POST', '/api/uploads/resumes')
export class UploadResumeController {
  private readonly database: PrimaryDatabase;
  private readonly storageService: StorageService;

  constructor() {
    this.database = primaryDatabase;
    this.storageService = storageService;
  }

  async handler(c: Context) {
    try {
      const data = (await c.req.formData()) as FormData;
      const resume = data.get('resume') as File;
      const userId = data.get('userId') as string;

      // if (!isIdValid(userId)) {
      //   return c.json(
      //     {
      //       data: {},
      //       success: false,
      //       isClientError: true,
      //       status: 400,
      //       ifNotFound: false,
      //       isUnauthorized: false,
      //       isForbidden: false,
      //       debug: false,
      //       isServerError: false,
      //       message: 'Invalid user id',
      //     },
      //     400,
      //   );
      // }

      if (!resume) {
        return c.json(
          {
            data: {},
            success: false,
            isClientError: true,
            status: 400,
            ifNotFound: false,
            isUnauthorized: false,
            isForbidden: false,
            debug: false,
            isServerError: false,
            message: 'Resume is required',
          },
          400,
        );
      }
      const url = await this.storageService.uploadResume(resume);

      const filename = resume.name;
      const filesize = resume.size;

      if (!userId) {
        return c.json(
          {
            data: {},
            success: false,
            isClientError: true,
            status: 401,
            ifNotFound: false,
            isUnauthorized: true,
            isForbidden: false,
            debug: false,
            isServerError: false,
            message: 'Unauthorized',
          },
          401,
        );
      }
      const repo = await this.database.open(ResumeEntity);
      const resumeEntity = repo.create({
        user: { id: userId },
        filename,
        url,
        filesize,
      });

      const savedResume = await repo.save(resumeEntity);

      if (!savedResume) {
        return c.json(
          {
            data: {},
            success: false,
            isClientError: true,
            status: 500,
            ifNotFound: false,
            isUnauthorized: false,
            isForbidden: false,
            debug: false,
            isServerError: false,
            message: 'Resume upload failed(database)',
          },
          500,
        );
      }
      return c.json({
        success: true,
        data: { url },
        isClientError: false,
        isServerError: false,
        isUnauthorized: false,
        isForbidden: false,
        debug: false,
        isNotFound: false,
      });
    } catch (e) {
      console.error(e);
      return c.json(
        {
          data: {},
          success: false,
          isClientError: true,
          status: 500,
          ifNotFound: false,
          isUnauthorized: false,
          isForbidden: false,
          debug: false,
          isServerError: true,
          message: 'Internal Server Error',
        },
        500,
      );
    }
  }
}
