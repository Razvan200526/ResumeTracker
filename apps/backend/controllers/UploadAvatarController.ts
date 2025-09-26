import { Route } from '@backend/decorators/Route';
import { StorageService } from '@backend/service/StorageService';
import { StorageValidator } from '@common/validators/envValidator';
import type { Context } from 'hono';

@Route('POST', '/api/uploads/images/avatars', 'Upload user avatar')
export class UploadAvatarController {
  constructor(
    private storageValidator: StorageValidator,
    public storageService: StorageService,
  ) {
    this.storageValidator = new StorageValidator();
    this.storageService = new StorageService(
      this.storageValidator.vars.R2_ACCESS_KEY,
      this.storageValidator.vars.R2_SECRET_ACCESS_KEY,
      this.storageValidator.vars.R2_ENDPOINT,
      this.storageValidator.vars.R2_BUCKET_NAME,
    );
  }
  async handler(c: Context) {
    try {
      const data = (await c.req.formData()) as FormData;
      const avatar = data.get('avatar') as File;
      if (!avatar) {
        return c.json({ error: 'No avatar provided' }, 400);
      }
      const url = await this.storageService.uploadAvatar(avatar);
      return c.json({ success: true, data: { url } });
    } catch (e) {
      console.error(e);
      return c.json({ error: 'Failed to upload', success: false }, 500);
    }
  }
}
