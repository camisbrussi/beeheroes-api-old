import { Router } from 'express';

import { CreateOccupationAreaController } from '@modules/accounts/useCases/OccupationArea/create/CreateController';
import { DeleteOccupationAreaController } from '@modules/accounts/useCases/OccupationArea/delete/DeleteController';
import { FindOccupationAreaController } from '@modules/accounts/useCases/OccupationArea/find/FindController';
import { ListOccupationAreaController } from '@modules/accounts/useCases/OccupationArea/list/ListController';
import { UpdateOccupationAreaController } from '@modules/accounts/useCases/OccupationArea/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const occupationAreaRoutes = Router();

const createOccupationAreaController = new CreateOccupationAreaController();
const listOccupationAreaController = new ListOccupationAreaController();
const updateOccupationAreaController = new UpdateOccupationAreaController();
const findOccupationAreaController = new FindOccupationAreaController();
const deleteOccupationAreaController = new DeleteOccupationAreaController();

occupationAreaRoutes.post('/', ensureAuthentication, createOccupationAreaController.handle);
occupationAreaRoutes.get('/', listOccupationAreaController.handle);
occupationAreaRoutes.get('/find', findOccupationAreaController.handle);
occupationAreaRoutes.put('/', ensureAuthentication, updateOccupationAreaController.handle);
occupationAreaRoutes.delete('/', ensureAuthentication, deleteOccupationAreaController.handle);

export { occupationAreaRoutes };
