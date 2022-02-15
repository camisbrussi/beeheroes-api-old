import { CreateUserTypeController } from '@modules/accounts/useCases/createUserType/CreateUserTypeController';
import { Router } from 'express';

const userTypesRoutes = Router();

const createUserTypeController = new CreateUserTypeController();

userTypesRoutes.post('/', createUserTypeController.handle );

export { userTypesRoutes };