import { Router } from 'express';

import { AuthenticationController } from '@modules/accounts/useCases/authentication/AuthenticationController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const authenticationRoutes = Router();

const authenticationController = new AuthenticationController();
const refreshTokenController = new RefreshTokenController();

authenticationRoutes.post('/sessions', authenticationController.handle);
authenticationRoutes.post('/refresh-token', refreshTokenController.handle);

export { authenticationRoutes };
