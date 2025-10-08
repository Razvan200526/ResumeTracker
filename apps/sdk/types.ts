import type { ResourceReadyState } from '@common/types';

export type UserType = {
  id: string;
  email: string;
  password: string;
  image: string;
  name: string;
  fistName: string;
  lastName: string;
  createdAt: Date;
};

export type ResponseType<T = any> = {
  data: T;
  message: string | null;
  success: boolean;
  status: number;
  isClientError: boolean;
  isServerError: boolean;
  isNotFound: boolean;
  isUnauthorized: boolean;
  isForbidden: boolean;
  debug: boolean;
  app: {
    url: string;
  };
};

export type UserAccountType = {
  id: string;
  user: UserType;
  image: string;
  providerId: string;
  accountId: string;
  password?: string;
  accessToken?: string;
  accessTokenExpiresAt?: Date;
  refreshToken?: string;
  refreshTokenExpiresAt?: Date;
  expiresAt?: Date;
  scope?: string;
  idToken?: string;
  createdAt: Date;
};

export type UserShareType = {
  id: string;
  sharedUser: UserType;
  user: UserType;
  createdAt: Date;
};

export type UserSessionType = {
  id: string;
  user: UserType;
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
};

export type UserVerificationType = {
  id: string;
  user: UserType;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt: Date;
};

export type UserTypeType = {
  id: string;
  name: string;
};

export type ResumeType = {
  id: string;
  name: string;
  url: string;
  isReady: boolean;
  state: ResourceReadyState;
  createdAt: Date;
};

export type CoverLetterType = {
  id: string;
  name: string;
  url: string;
  user: UserType;
  isReady: boolean;
  state: ResourceReadyState;
  uploadedAt: Date;
};
