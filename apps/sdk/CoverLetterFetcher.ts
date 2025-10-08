import { Toast } from '@common/components/toast';
import { queryClient } from '@frontend/shared/QueryClient';
import type { Fetcher } from './Fetcher';
import { Socket } from './Socket';
import type { CoverLetterType, ResponseType } from './types';

export class CoverLetterFetcher {
  constructor(private readonly fetcher: Fetcher) {}

  public readonly coverletter = {
    retrieve: async (payload: { userId: string }): Promise<ResponseType> => {
      return this.fetcher.get(`/api/coverletters/${payload.userId}`);
    },
    // upload: async (payload: {
    //   userId: string;
    //   url: string;
    // }): Promise<ResponseType> => {
    //   return this.fetcher.post(
    //     `/api/coverletter/${payload.userId}/upload`,
    //     payload,
    //   );
    // },
    get: async (payload: { id: string }): Promise<ResponseType> => {
      return this.fetcher.get(`/api/coverletter/${payload.id}`);
    },
    delete: async (payload: {
      coverletterIds: string[];
      userId: string;
    }): Promise<ResponseType> => {
      return this.fetcher.delete('/api/coverletter/delete', payload);
    },
  };

  public readonly create = (payload: { url: string }) => {
    const socket = new Socket('ws://localhost:2000');

    socket.on<{ coverletter: CoverLetterType }>('message', (response) => {
      queryClient.invalidateQueries();

      const isReady = response.data.coverletter.isReady;
      const isFailed = response.data.coverletter.state === 'failed';

      if (isReady || isFailed) {
        socket.close();
      }

      if (isReady) {
        Toast.success({ description: 'Coverletter uploaded sucessfully' });
      }

      socket.send({
        channelName: 'coverletter:create',
        data: {
          url: payload.url,
        },
      });
    });

    Toast.info({ description: 'Uploading coverletter' });
  };
}
