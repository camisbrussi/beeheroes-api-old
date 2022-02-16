import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

import { CreateUserTypeController } from '@modules/accounts/useCases/createUserType/CreateUserTypeController';


const userTypesRoutes = Router();

const createUserTypeController = new CreateUserTypeController();

userTypesRoutes.post('/', ensureAuthentication, createUserTypeController.handle );

export { userTypesRoutes };