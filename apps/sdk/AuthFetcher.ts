import type { Fetcher } from './Fetcher';
import type { ResponseType, UserType } from './types';

export class AuthFetcher {
  constructor(private readonly fetcher: Fetcher) {}

  public setAuthToken(token: string) {
    this.fetcher.setAuthToken(token);
  }
  public readonly signup = {
    email: async (payload: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      image: string;
    }): Promise<ResponseType<{ success: boolean; user: UserType }>> => {
      return await this.fetcher.post('/auth/signup/email', payload);
    },
    checkOtp: async (payload: {
      email: string;
      otp: string;
    }): Promise<ResponseType<{ status: boolean }>> => {
      return await this.fetcher.post('/auth/signup/check-otp', payload);
    },
    sendOTP: async (payload: {
      email: string;
    }): Promise<ResponseType<{ success: boolean }>> => {
      return await this.fetcher.post('/auth/signup/send-otp', payload);
    },
  };
  public readonly signin = {
    email: async (payload: {
      email: string;
      password: string;
    }): Promise<
      ResponseType<{
        data: { user: UserType; token: string };
        success: boolean;
      }>
    > => {
      return await this.fetcher.post('/auth/signin/email', payload);
    },
  };

  public readonly forgetPassword = {
    email: async (
      email: string,
    ): Promise<ResponseType<{ success: boolean }>> => {
      return await this.fetcher.post('/auth/forget-password/email', { email });
    },
  };

  public readonly resetPassword = async (payload: {
    email: string;
    otp: string;
    password: string;
  }): Promise<ResponseType<{ success: boolean }>> => {
    return await this.fetcher.post('/auth/reset-password', payload);
  };

  public readonly retrieve = async (): Promise<
    ResponseType<{ user: UserType | null }>
  > => {
    return await this.fetcher.get('/auth/session');
  };

  public async signout(): Promise<ResponseType<{ success: boolean }>> {
    return await this.fetcher.get('/auth/signout');
  }
}
