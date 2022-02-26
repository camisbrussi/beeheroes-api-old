import { Router } from 'express';

import { authenticationRoutes } from './authentication.routes';
import { organizationsRoutes } from './organizations.routes';
import { organizationTypesRoutes } from './organizationTypes.routes';
import { usersRoutes } from './users.routes';
import { userTypesRoutes } from './userTypes.routes';

const router = Router();

router.use('/usertypes', userTypesRoutes);
router.use('/users', usersRoutes);
router.use('/organizationtypes', organizationTypesRoutes);
router.use('/organizations', organizationsRoutes);
router.use(authenticationRoutes);

export { router };
