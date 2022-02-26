import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

import { FindUserController } from '@modules/accounts/useCases/User/find/FindController';
import { UpdateUserController } from '@modules/accounts/useCases/User/update/UpdateController';
import { ListUserController } from '@modules/accounts/useCases/User/list/ListUserController';
import { FilterUserController } from '@modules/accounts/useCases/User/filter/FilterController';
import { CreateUserController } from '@modules/accounts/useCases/User/create/CreateController';


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