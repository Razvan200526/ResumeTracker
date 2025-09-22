import { Hono, type Context } from "hono";
import { userRepository } from "@backend/user/repositories/UserRepository";
import {
  validateUserModel,
  type CreateUserModel,
} from "@backend/user/models/CreateUserModel";
import { UserEntity } from "@backend/user/entities/UserEntity";
export const createUserController = new Hono();
createUserController.post("/auth/signin/email", async (c: Context) => {
  try {
    const userData = (await c.req.json()) as CreateUserModel;
    const valid = validateUserModel(userData);
    if (!valid) {
      return c.json({ message: "Invalid user data" }, 400);
    }
    const existingUser = await userRepository.findOneBy({
      email: userData.email,
    });

    if (existingUser) {
      return c.json({ message: "User already exists" }, 400);
    }

    const entity = new UserEntity();
    entity.email = userData.email;
    entity.password = userData.password;
    entity.name = userData.email.split("@")[0];
    entity.firstName = userData.email.split("@")[0];
    entity.lastName = userData.email.split("@")[0];
    try {
      const newUser = await userRepository.create(entity);
      return c.json({ newUser, success: true }, 201);
    } catch (error) {
      console.error(error);
      return c.json({ message: "Failed to create user" }, 500);
    }
  } catch (error) {
    console.error("Error creating user:", error);

    if (error instanceof AggregateError) {
      for (const err of error.errors) {
        console.error("AggregateError item:", err);
      }
    }

    return c.json({ message: "Failed to create user" }, 500);
  }
});
