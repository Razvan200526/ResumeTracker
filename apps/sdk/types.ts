export type UserType = {
  id: string;
  email: string;
  password: string;
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
