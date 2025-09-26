import { ForgetPasswordEmailController } from '@backend/auth/controllers/ForgetPasswordEmailController';
import { ResetPasswordController } from '@backend/auth/controllers/ResetPasswordController';
import { RetrieveSessionController } from '@backend/auth/controllers/RetrieveSessionController';
import { SigninEmailController } from '@backend/auth/controllers/SigninEmailController';
import { SignoutController } from '@backend/auth/controllers/SignoutController';
import { SignupCheckOtpController } from '@backend/auth/controllers/SignupCheckOtpController';
// Auth controllers
import { SignupEmailController } from '@backend/auth/controllers/SignupEmailController';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { UploadAvatarController } from './controllers/UploadAvatarController';
import { CheckUserExistsController } from './controllers/UserExistsController';

export const app = new Hono();
app.use(logger());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://pub-6858952ca1f64c08a3e778080d6e2ee6.r2.dev',
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// Small helper to register controllers defined with @Route decorator
function registerController(app: any, Controller: new () => any) {
  const instance = new Controller();
  const meta = (instance as any).route as
    | { method: string; path: string; description?: string }
    | undefined;

  if (!meta || typeof (app as any)[meta.method.toLowerCase()] !== 'function') {
    return;
  }

  (app as any)[meta.method.toLowerCase()](meta.path, (c: any) =>
    instance.handler(c),
  );
}

// Register auth routes mirroring azurite
registerController(app, SignupEmailController);
registerController(app, SignupCheckOtpController);
registerController(app, SigninEmailController);
registerController(app, SignoutController);
registerController(app, RetrieveSessionController);
registerController(app, ForgetPasswordEmailController);
registerController(app, ResetPasswordController);
registerController(app, CheckUserExistsController);
registerController(app, UploadAvatarController);
// SDK compatibility: also expose POST /api/auth/signup mapping to the same handler as /email
app.post('/api/auth/signup', async (c) => {
  const ctrl = new SignupEmailController();
  return await ctrl.handler(c);
});

app.get('/health', (c) => c.json({ status: 'ok' }));
