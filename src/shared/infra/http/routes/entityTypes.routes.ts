import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

import { CreateEntityTypeController } from '@modules/entities/useCases/CreateEntityType/CreateEntityTypeController';

const entityTypesRoutes = Router();

const createEntityTypeController = new CreateEntityTypeController();

entityTypesRoutes.post('/', ensureAuthentication, createEntityTypeController.handle );


export { entityTypesRoutes };