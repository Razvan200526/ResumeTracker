import * as z from "zod";

const InputEmailSchema = z.object({
  email: z.email(),
});

export const isEmailValid = (email: string) => {
  try {
    return InputEmailSchema.safeParse({ email }).success;
  } catch (e) {
    console.error(e);
    return false;
  }
};
