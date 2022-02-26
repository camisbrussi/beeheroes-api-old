import { Router } from 'express';

import { userTypesRoutes } from './userTypes.routes';
import { usersRoutes } from './users.routes';
import { organizationTypesRoutes } from './organizationTypes.routes';
import { organizationsRoutes } from './organizations.routes';

import { authenticationRoutes } from './authentication.routes';

const router = Router();

router.use('/usertypes', userTypesRoutes);
router.use('/users', usersRoutes);
router.use('/organizationtypes', organizationTypesRoutes);
router.use('/organizations', organizationsRoutes);
router.use(authenticationRoutes);


export { router };