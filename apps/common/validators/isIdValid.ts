import * as z from 'zod';

const idSchema = z.string().min(15).max(15);

export const isIdValid = (id: string): boolean => {
  return idSchema.safeParse(id).success;
};
