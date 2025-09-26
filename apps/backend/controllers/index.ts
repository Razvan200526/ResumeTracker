import { app } from '@backend/App';
import { ForgetPasswordEmailController } from '@backend/auth/controllers/ForgetPasswordEmailController';
import { ResetPasswordController } from '@backend/auth/controllers/ResetPasswordController';
import { RetrieveSessionController } from '@backend/auth/controllers/RetrieveSessionController';
import { SigninEmailController } from '@backend/auth/controllers/SigninEmailController';
import { SignoutController } from '@backend/auth/controllers/SignoutController';
import { SignupCheckOtpController } from '@backend/auth/controllers/SignupCheckOtpController';
import { SignupEmailController } from '@backend/auth/controllers/SignupEmailController';
import { registerController } from '@backend/shared/registerController';
import { CheckUserExistsController } from './UserExistsController';

// Register auth routes mirroring azurite
registerController(app, SignupEmailController);
registerController(app, SignupCheckOtpController);
registerController(app, SigninEmailController);
registerController(app, SignoutController);
registerController(app, RetrieveSessionController);
registerController(app, ForgetPasswordEmailController);
registerController(app, ResetPasswordController);
registerController(app, CheckUserExistsController);

//@ts-ignore trust-me
registerController(app, UploadAvatarController);
