import type { Fetcher } from './Fetcher';
import type { ResponseType } from './types';

export class MessageFetcher {
  constructor(private readonly fetcher: Fetcher) {}

  public readonly coverletter = {
    message: async (payload: {
      question: string;
      id: string;
    }): Promise<ResponseType> => {
      this.fetcher.config.baseURL = 'http://localhost:8000';
      const res = this.fetcher.post(`/api/coverletters/message/${payload.id}`, {
        message: payload.question,
      });
      this.fetcher.config.baseURL = 'http://localhost:3000';
      return res;
    },
  };
}
