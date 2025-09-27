import { Toast } from '@common/components/toast';
import { Backend } from '@sdk/backend';
import { Fetcher, type FetcherConfigType } from '@sdk/Fetcher';

const fetcher = new Fetcher({
  baseURL: 'http://localhost:2000',
  headers: { 'Content-Type': 'application/json' },
  beforeSend: (config: FetcherConfigType) => ({
    ...config,
    headers: {
      ...config.headers,
    },
  }),
  onServerError: (message: string) => {
    Toast.error({
      title: 'Server Error',
      description: message,
    });
  },
});
fetcher.configure({
  headers: {
    Authorization: 'Bearer auth-session-token',
  },
});
fetcher.setAuthToken('auth-session-token');

export const backend = new Backend(fetcher);
