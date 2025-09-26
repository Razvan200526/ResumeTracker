import { AuthFetcher } from './AuthFetcher';
import type { Fetcher } from './Fetcher';

export class Backend {
  public readonly auth: AuthFetcher;

  constructor(private readonly fetcher: Fetcher) {
    this.auth = new AuthFetcher(this.fetcher);
  }
}
