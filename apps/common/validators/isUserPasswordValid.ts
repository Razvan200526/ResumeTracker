import * as z from "zod";

const passwordSchema = z.object({
  password: z.string().min(8).max(100),
});

export const isUserPasswordValid = (password: string) => {
  try {
    return z.safeParse(passwordSchema, { password }).success;
  } catch (e) {
    console.error(e);
    return false;
  }
};
