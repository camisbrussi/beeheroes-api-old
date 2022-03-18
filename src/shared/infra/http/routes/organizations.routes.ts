import { Router } from 'express';
import multer from 'multer';

import { CreateOrganizationController } from '@modules/organizations/useCases/Organization/create/CreateController';
import { FilterOrganizationController } from '@modules/organizations/useCases/Organization/filter/FilterController';
import { FindOrganizationController } from '@modules/organizations/useCases/Organization/find/FindController';
import { UpdateOrganizationController } from '@modules/organizations/useCases/Organization/update/UpdateController';
import { FindOrganizationImagesController } from '@modules/organizations/useCases/OrganizationImages/find/FindOrganizationImagesController';
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
const findOrganizationImagesController = new FindOrganizationImagesController();
const updateOrganizationAvatarController = new UpdateOrganizationAvatarController();

const upload = multer(uploadConfig);

organizationsRoutes.post('/', ensureAuthentication, createOrganizationsController.handle);
organizationsRoutes.post('/users', ensureAuthentication, createOrganizationUserController.handle);
organizationsRoutes.get('/find', findOrganizationsController.handle);
organizationsRoutes.get('/', filterOrganizationsController.handle);
organizationsRoutes.get('/images', findOrganizationImagesController.handle);
organizationsRoutes.put('/', ensureAuthentication, updateOrganizationsController.handle);

organizationsRoutes.post(
  '/images',
  ensureAuthentication,
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
