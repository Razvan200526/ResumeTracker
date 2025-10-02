import { Toast } from '@common/components/toast';
import { queryClient } from '@frontend/shared/QueryClient';
import type { Fetcher } from './Fetcher';
import { Socket } from './Socket';
import type { ResponseType, ResumeType } from './types';

export class ResumeFetcher {
  constructor(private readonly fetcher: Fetcher) {}

  public readonly resumes = {
    retrieve: async (payload: { userId: string }): Promise<ResponseType> => {
      return this.fetcher.get(`/api/resumes/${payload.userId}`);
    },
    // upload: async (payload: {
    //   userId: string;
    //   url: string;
    // }): Promise<ResponseType> => {
    //   return this.fetcher.post(
    //     `/api/resumes/${payload.userId}/upload`,
    //     payload,
    //   );
    // },
    delete: async (payload: {
      resumeIds: number[];
      userId: string;
    }): Promise<ResponseType> => {
      return this.fetcher.delete('/api/resumes/delete', payload);
    },
  };

  public readonly create = (payload: { url: string }) => {
    const socket = new Socket('ws://localhost:2000');

    socket.on<{ resume: ResumeType }>('message', (response) => {
      queryClient.invalidateQueries();

      const isReady = response.data.resume.isReady;
      const isFailed = response.data.resume.state === 'failed';

      if (isReady || isFailed) {
        socket.close();
      }

      if (isReady) {
        Toast.success({ description: 'Resume uploaded sucessfully' });
      }

      socket.send({
        channelName: 'resume:create',
        data: {
          url: payload.url,
        },
      });
    });

    Toast.info({ description: 'Uploading resume' });
  };
}
