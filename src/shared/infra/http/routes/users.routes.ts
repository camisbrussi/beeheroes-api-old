import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

import { CreateUserController } from '@modules/accounts/useCases/User/createUser/CreateUseController';
import { FindUserController } from '@modules/accounts/useCases/User/findUser/FindUserController';
import { UpdateUserController } from '@modules/accounts/useCases/User/updateUser/UpdateUserController';
import { ListUserController } from '@modules/accounts/useCases/User/listUser/ListUserController';
import { FilterUserController } from '@modules/accounts/useCases/User/filterUser/FilterUserController';


const usersRoutes = Router();

const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const listUserController = new ListUserController();
const filterUserController = new FilterUserController();

usersRoutes.post('/', ensureAuthentication, createUserController.handle );
usersRoutes.get('/find', ensureAuthentication, findUserController.handle );
usersRoutes.get('/filter', ensureAuthentication, filterUserController.handle );
usersRoutes.get('/', ensureAuthentication, listUserController.handle );
usersRoutes.put('/', ensureAuthentication, updateUserController.handle );

export { usersRoutes };