import { Router } from 'express';

import { entityTypesRoutes } from './entityTipes.routes';

const router = Router();

router.use('/entitytypes', entityTypesRoutes);


export { router };