import { userRepository } from "@backend/user/repositories/UserRepository";
import { isEmailValid } from "@common/validators/isEmailValid";
import { isUserPasswordValid } from "@common/validators/isUserPasswordValid";
import { Hono, type Context } from "hono";

const signInController = new Hono();
signInController.post("/auth/signin", async (c: Context) => {
  const { email, password } = await c.req.json();
  if (!isEmailValid(email) || !isUserPasswordValid(password)) {
    return c.json({ error: "Invalid email or password" }, 400);
  }

  const user = await userRepository.findOneByOrFail({
    email: email,
    password: password,
  });
  if (!user) {
    return c.json({ error: "Invalid email or password" }, 400);
  }
});
