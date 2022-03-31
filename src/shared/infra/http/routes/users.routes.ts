import { Router } from 'express';
import multer from 'multer';

import { ProfileUserController } from '@modules/accounts/useCases/profileUser/ProfileUserController';
import { UpdateNewUserAvatarController } from '@modules/accounts/useCases/updateNewUserAvatar/UpdateNewUserAvatarController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { CreateUserController } from '@modules/accounts/useCases/User/create/CreateController';
import { FilterUserController } from '@modules/accounts/useCases/User/filter/FilterController';
import { FindUserController } from '@modules/accounts/useCases/User/find/FindController';
import { UpdateUserController } from '@modules/accounts/useCases/User/update/UpdateController';
import { CreateUserRoleController } from '@modules/accounts/useCases/UserRole/create/CreateController';

import uploadConfig from '../../../../config/upload';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const findUserController = new FindUserController();
const updateUserController = new UpdateUserController();
const filterUserController = new FilterUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();
const createUserRoleController = new CreateUserRoleController();
const updateNewUserAvatarController = new UpdateNewUserAvatarController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/find', findUserController.handle);
usersRoutes.get('/', filterUserController.handle);
usersRoutes.put('/', ensureAuthentication, updateUserController.handle);
usersRoutes.get('/profile', ensureAuthentication, profileUserController.handle);
usersRoutes.post('/roles', ensureAuthentication, createUserRoleController.handle);
usersRoutes.patch(
  '/avatar',
  ensureAuthentication,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

usersRoutes.post(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateNewUserAvatarController.handle,
);

export { usersRoutes };
