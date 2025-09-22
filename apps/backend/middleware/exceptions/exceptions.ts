import type * as z from "zod";
export class NotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundException";
  }
}

export class ValidationException extends Error {
  constructor(error: z.ZodError | undefined) {
    if (!error) {
      console.log("Validation error occurred");
    }
    super(error?.message);
    this.name = "ValidationException";
  }
}
