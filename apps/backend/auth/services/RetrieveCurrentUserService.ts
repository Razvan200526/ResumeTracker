import type { UserRepository } from '@backend/user/repositories/UserRepository';
import { userRepository } from '@backend/user/repositories/UserRepository';

export class RetrieveCurrentUserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = userRepository;
  }

  public async retrieve(id: string) {
    const user = this.userRepository.findOne(id);
    if (!user) {
      return {
        user: null,
      };
    }

    return {
      user: {
        ...user,
      },
    };
  }
}

export const retrieveCurrentUserService = new RetrieveCurrentUserService();
