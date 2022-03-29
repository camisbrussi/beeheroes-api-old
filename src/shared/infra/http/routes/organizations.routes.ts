import { Router } from 'express';
import multer from 'multer';

import { CreateOrganizationController } from '@modules/organizations/useCases/Organization/create/CreateController';
import { FilterOrganizationController } from '@modules/organizations/useCases/Organization/filter/FilterController';
import { FindOrganizationController } from '@modules/organizations/useCases/Organization/find/FindController';
import { FindOrganizationUserController } from '@modules/organizations/useCases/Organization/findbyUser/FindController';
import { UpdateOrganizationController } from '@modules/organizations/useCases/Organization/update/UpdateController';
import { UploadOrganizationImagesController } from '@modules/organizations/useCases/OrganizationImages/upload/UploadOrganizationImagesController';
import { CreateOrganizationUserController } from '@modules/organizations/useCases/OrganizationUser/create/CreateController';
import { UpdateOrganizationAvatarController } from '@modules/organizations/useCases/updateOrganizationAvatar/UpdateOrganizationAvatarController';

import uploadConfig from '../../../../config/upload';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const organizationsRoutes = Router();

const createOrganizationsController = new CreateOrganizationController();
const createOrganizationUserController = new CreateOrganizationUserController();
const findOrganizationsController = new FindOrganizationController();
const updateOrganizationsController = new UpdateOrganizationController();
const filterOrganizationsController = new FilterOrganizationController();
const uploadOrganizationImagesController = new UploadOrganizationImagesController();
const updateOrganizationAvatarController = new UpdateOrganizationAvatarController();
const findOrganizationUserController = new FindOrganizationUserController();

const upload = multer(uploadConfig);

organizationsRoutes.post('/', createOrganizationsController.handle);
organizationsRoutes.post('/filter', filterOrganizationsController.handle);
organizationsRoutes.post('/users', createOrganizationUserController.handle);
organizationsRoutes.get('/find', findOrganizationsController.handle);
organizationsRoutes.get('/user', findOrganizationUserController.handle);
organizationsRoutes.put('/', ensureAuthentication, updateOrganizationsController.handle);

organizationsRoutes.post(
  '/images',
  upload.array('images'),
  uploadOrganizationImagesController.handle,
);

organizationsRoutes.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  updateOrganizationAvatarController.handle,
);

export { organizationsRoutes };
