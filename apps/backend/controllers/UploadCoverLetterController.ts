import { Route } from '@backend/decorators/Route';
import { CoverletterEntity } from '@backend/resources/cover-letters/CoverletterEntity';
import {
  type StorageService,
  storageService,
} from '@backend/service/StorageService';
import {
  type PrimaryDatabase,
  primaryDatabase,
} from '@backend/shared/database/PrimaryDatabase';
import type { Context } from 'hono';

@Route('POST', '/api/uploads/coverletters', 'Upload a cover letter')
export class UploadCoverLetterController {
  private database: PrimaryDatabase;
  private readonly storageService: StorageService;

  constructor() {
    this.database = primaryDatabase;
    this.storageService = storageService;
  }
  async handler(c: Context) {
    try {
      const data = (await c.req.formData()) as FormData;
      const coverletter = data.get('coverletter') as File;
      const userId = data.get('userId') as string;

      if (!coverletter) {
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
            message: 'Cover letter is required',
          },
          400,
        );
      }

      const url = await this.storageService.uploadCoverletter(coverletter);
      if (!url) {
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
            message: 'Failed to upload cover letter',
          },
          400,
        );
      }
      const filesize = coverletter.size;
      const filename = coverletter.name;
      if (!userId) {
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
            message: 'User ID is required',
          },
          400,
        );
      }

      const repo = await this.database.open(CoverletterEntity);
      const coverletterEntity = repo.create({
        user: { id: userId },
        url,
        filesize,
        filename,
      });

      const savedCoverletter = await repo.save(coverletterEntity);
      if (!savedCoverletter) {
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
