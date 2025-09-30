import type { Fetcher } from './Fetcher';
import type { ResponseType, UserType } from './types';

export class UploadFetcher {
  constructor(private readonly fetcher: Fetcher) {}

  public readonly image = {
    avatar: async (data: FormData): Promise<ResponseType<{ url: string }>> => {
      this.fetcher.clearContentType();
      const response = await this.fetcher.post('/uploads/images/avatars', data);
      this.fetcher.setContentType();

      return response;
    },

    image: async (data: FormData): Promise<ResponseType<{ url: string }>> => {
      this.fetcher.clearContentType();
      const response = await this.fetcher.post('/uploads/images', data);
      this.fetcher.setContentType();

      return response;
    },
  };

  public readonly resume = {
    uploadResume: async (
      data: FormData,
    ): Promise<ResponseType<{ url: string }>> => {
      this.fetcher.clearContentType();
      const response = await this.fetcher.post('/uploads/resumes', data);
      this.fetcher.setContentType();

      return response;
    },
  };
}
