import { Hono } from 'hono';
import { cors } from 'hono/cors';
// import { jwt } from 'hono/jwt'; // Import jwt
import { logger } from 'hono/logger';
import { CreateUserSessionController } from './auth/controllers/CreateUserSessionControllers';
import { RetrieveSessionController } from './auth/controllers/RetrieveSessionController';
import { SignInController } from './auth/controllers/SigninController';
import { SignupCheckOtpController } from './auth/controllers/SignupCheckOtpController';
import { SignupEmailController } from './auth/controllers/SignupEmailController';
import { UploadAvatarController } from './controllers/UploadAvatarController';
import { CheckUserExistsController } from './controllers/UserExistsController';
import { registerController } from './shared/registerController';
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

import { SignoutController } from './auth/controllers/SignoutController';
import { GetUserResumeController } from './controllers/GetUserResumesController';
import { UploadResumeController } from './controllers/UploadResumeController';
import { authMiddleware } from './middleware/authMiddleware';

// Register auth routes mirroring azurite
registerController(app, SignupEmailController);
registerController(app, SignupCheckOtpController);
registerController(app, SignInController);
registerController(app, CheckUserExistsController);

app.use('/api/auth/session', authMiddleware);
registerController(app, RetrieveSessionController);
registerController(app, CreateUserSessionController);
registerController(app, SignoutController);
//@ts-ignore trust-me
registerController(app, UploadAvatarController);
registerController(app, UploadResumeController);
registerController(app, GetUserResumeController);
app.post('/api/auth/signup', async (c) => {
  const ctrl = new SignupEmailController();
  return await ctrl.handler(c);
});

app.onError((err, c) => {
  return c.json({ success: false, error: err.message }, 500);
});

app.get('/health', (c) => c.json({ status: 'ok' }));
