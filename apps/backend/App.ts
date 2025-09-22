import { Hono } from "hono";

import { logger } from "hono/logger";
import { cors } from "hono/cors";

import { createUserController } from "./routes/CreateUserController";
export const app = new Hono();
app.use(logger());
app.use(
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.route("/api", createUserController);
// app.post("/api/auth/signin/email", async (c: Context) => {
//   try {
//     const body = await c.req.json();
//     const { email, password } = body;
//     if (typeof email !== "string" || typeof password !== "string") {
//       throw new Error("Invalid email or password");
//     }
//     if (!isEmailValid(email) || !isUserPasswordValid(password)) {
//       throw new Error("Invalid email or password");
//     }
//     return c.json({
//       id: crypto.randomUUID(),
//       email,
//       password,
//       success: true,
//       name: email.split("@")[0],
//       firstName: email.split("@")[0],
//       lastName: email.split("@")[0],
//       createdAt: new Date(),
//     });
//   } catch (e) {
//     console.error(e);
//     return c.json({ message: "User creation failed" }, 500);
//   }
// });
app.get("/health", (c) => c.json({ status: "ok" }));
