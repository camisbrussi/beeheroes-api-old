import { Router } from 'express';
import multer from 'multer';

import { CreateOrganizationController } from '@modules/organizations/useCases/Organization/create/CreateController';
import { FilterOrganizationController } from '@modules/organizations/useCases/Organization/filter/FilterController';
import { FindOrganizationController } from '@modules/organizations/useCases/Organization/find/FindController';
import { ListOrganizationController } from '@modules/organizations/useCases/Organization/list/ListController';
import { UpdateOrganizationController } from '@modules/organizations/useCases/Organization/update/UpdateController';
import { FindOrganizationImagesController } from '@modules/organizations/useCases/OrganizationImages/find/FindOrganizationImagesController';
import { UploadOrganizationImagesController } from '@modules/organizations/useCases/OrganizationImages/upload/UploadOrganizationImagesController';
import { CreateOrganizationUserController } from '@modules/organizations/useCases/OrganizationUser/create/CreateController';

import uploadConfig from '../../../../config/upload';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const organizationsRoutes = Router();

const createOrganizationsController = new CreateOrganizationController();
const createOrganizationUserController = new CreateOrganizationUserController();
const findOrganizationsController = new FindOrganizationController();
const updateOrganizationsController = new UpdateOrganizationController();
const listOrganizationsController = new ListOrganizationController();
const filterOrganizationsController = new FilterOrganizationController();
const uploadOrganizationImagesController = new UploadOrganizationImagesController();
const findOrganizationImagesController = new FindOrganizationImagesController();

const upload = multer(uploadConfig);

organizationsRoutes.post('/', ensureAuthentication, createOrganizationsController.handle);
organizationsRoutes.post('/users', ensureAuthentication, createOrganizationUserController.handle);
organizationsRoutes.get('/find', ensureAuthentication, findOrganizationsController.handle);
organizationsRoutes.get('/filter', ensureAuthentication, filterOrganizationsController.handle);
organizationsRoutes.get('/', ensureAuthentication, listOrganizationsController.handle);
organizationsRoutes.get('/images', ensureAuthentication, findOrganizationImagesController.handle);
organizationsRoutes.put('/', ensureAuthentication, updateOrganizationsController.handle);

organizationsRoutes.post(
  '/images',
  ensureAuthentication,
  upload.array('images'),
  uploadOrganizationImagesController.handle,
);

export { organizationsRoutes };
