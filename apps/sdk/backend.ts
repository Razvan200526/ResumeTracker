import { AuthFetcher } from './AuthFetcher';
import type { Fetcher } from './Fetcher';
import { UploadFetcher } from './UploadFetcher';
import { UserFetcher } from './UserFetcher';

export class Backend {
  public readonly auth: AuthFetcher;
  public readonly users: UserFetcher;
  public readonly upload: UploadFetcher;
  constructor(private readonly fetcher: Fetcher) {
    this.auth = new AuthFetcher(this.fetcher);
    this.users = new UserFetcher(this.fetcher);
    this.upload = new UploadFetcher(this.fetcher);
  }
}
