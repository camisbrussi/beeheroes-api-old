import { Router } from 'express';

import { entityTypesRoutes } from './entityTypes.routes';
import { userTypesRoutes } from './userTypes.routes';

const router = Router();

router.use('/entitytypes', entityTypesRoutes);
router.use('/usertypes', userTypesRoutes);


export { router };