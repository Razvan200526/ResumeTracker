import { Route } from '@backend/decorators/Route';
import { resumeRepository } from '@backend/resources/resumes/ResumeRepository';
import type { Context } from 'hono';

@Route(
  'DELETE',
  '/api/resumes/delete',
  'Controller for deleting 1 or more resumes',
)
export class DeleteResumeController {
  private readonly resumeRepository = resumeRepository;

  async handler(c: Context) {
    try {
      const { resumeIds, userId } = await c.req.json();

      // Validate input
      if (!resumeIds || !Array.isArray(resumeIds) || resumeIds.length === 0) {
        return c.json(
          {
            data: { success: false, deletedCount: 0 },
            message: 'Invalid resume IDs provided',
            success: false,
            status: 400,
            isClientError: true,
            isServerError: false,
            isNotFound: false,
            isUnauthorized: false,
            isForbidden: false,
            debug: false,
            app: { url: c.req.url },
          },
          400,
        );
      }

      if (!userId) {
        return c.json(
          {
            data: { success: false, deletedCount: 0 },
            message: 'User ID is required',
            success: false,
            status: 400,
            isClientError: true,
            isServerError: false,
            isNotFound: false,
            isUnauthorized: false,
            isForbidden: false,
            debug: false,
            app: { url: c.req.url },
          },
          400,
        );
      }

      // First, find the resumes and verify they belong to the user
      const resumes = await this.resumeRepository.findByIds(resumeIds);

      if (resumes.length !== resumeIds.length) {
        return c.json(
          {
            data: { success: false, deletedCount: 0 },
            message: 'Some resumes not found',
            success: false,
            status: 404,
            isClientError: true,
            isServerError: false,
            isNotFound: true,
            isUnauthorized: false,
            isForbidden: false,
            debug: false,
            app: { url: c.req.url },
          },
          404,
        );
      }

      // Verify all resumes belong to the requesting user
      const unauthorized = resumes.some((resume) => resume.user.id !== userId);
      if (unauthorized) {
        return c.json(
          {
            data: { success: false, deletedCount: 0 },
            message:
              'Unauthorized: Cannot delete resumes that do not belong to you',
            success: false,
            status: 403,
            isClientError: true,
            isServerError: false,
            isNotFound: false,
            isUnauthorized: false,
            isForbidden: true,
            debug: false,
            app: { url: c.req.url },
          },
          403,
        );
      }

      // Delete the resumes
      const result = await this.resumeRepository.deleteByIds(resumeIds);

      return c.json(
        {
          data: {
            success: true,
            deletedCount: result.affected || 0,
          },
          message: `Successfully deleted ${result.affected || 0} resume(s)`,
          success: true,
          status: 200,
          isClientError: false,
          isServerError: false,
          isNotFound: false,
          isUnauthorized: false,
          isForbidden: false,
          debug: false,
          app: { url: c.req.url },
        },
        200,
      );
    } catch (error) {
      console.error('Delete resumes error:', error);

      return c.json(
        {
          data: { success: false, deletedCount: 0 },
          message: 'Internal server error occurred while deleting resumes',
          success: false,
          status: 500,
          isClientError: false,
          isServerError: true,
          isNotFound: false,
          isUnauthorized: false,
          isForbidden: false,
          debug: true,
          app: { url: c.req.url },
        },
        500,
      );
    }
  }
}
