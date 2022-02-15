import { Router } from 'express';

import { entityTypesRoutes } from './entityTypes.routes';
import { userTypesRoutes } from './userTypes.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/entitytypes', entityTypesRoutes);
router.use('/usertypes', userTypesRoutes);
router.use('/users', usersRoutes);


export { router };