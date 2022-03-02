import { Router } from 'express';

import { CreateOccupationAreaController } from '@modules/volunteers/useCases/OccupationArea/create/CreateController';
import { DeleteOccupationAreaController } from '@modules/volunteers/useCases/OccupationArea/delete/DeleteController';
import { FindOccupationAreaController } from '@modules/volunteers/useCases/OccupationArea/find/FindController';
import { ListOccupationAreaController } from '@modules/volunteers/useCases/OccupationArea/list/ListController';
import { UpdateOccupationAreaController } from '@modules/volunteers/useCases/OccupationArea/update/UpdateController';

import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const occupationAreaRoutes = Router();

const createOccupationAreaController = new CreateOccupationAreaController();
const listOccupationAreaController = new ListOccupationAreaController();
const updateOccupationAreaController = new UpdateOccupationAreaController();
const findOccupationAreaController = new FindOccupationAreaController();
const deleteOccupationAreaController = new DeleteOccupationAreaController();

occupationAreaRoutes.post('/', ensureAuthentication, createOccupationAreaController.handle);
occupationAreaRoutes.get('/', ensureAuthentication, listOccupationAreaController.handle);
occupationAreaRoutes.get('/find', ensureAuthentication, findOccupationAreaController.handle);
occupationAreaRoutes.put('/', ensureAuthentication, updateOccupationAreaController.handle);
occupationAreaRoutes.delete('/', ensureAuthentication, deleteOccupationAreaController.handle);

export { occupationAreaRoutes };
