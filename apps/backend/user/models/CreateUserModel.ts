import { ValidationException } from '@backend/middleware/exceptions/exceptions';
import type { UserType } from '@sdk/types';
import * as z from 'zod';
export type CreateUserModel = {
  email: string;
  password: string;
};
export const CreateUserModelSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100),
});

export const validateUserModel = (
  data: Partial<Omit<UserType, 'id' | 'createdAt' | 'updatedAt' | 'image'>>,
) => {
  try {
    if (!CreateUserModelSchema.safeParse(data).success) {
      throw new ValidationException(
        CreateUserModelSchema.safeParse(data).error,
      );
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
