import { Router } from 'express';

import { CreateEntityTypeController } from '@modules/entities/useCases/CreateEntityType/CreateEntityTypeController';

const entityTypesRoutes = Router();

const createEntityTypeController = new CreateEntityTypeController();

entityTypesRoutes.post('/', createEntityTypeController.handle );


export { entityTypesRoutes };