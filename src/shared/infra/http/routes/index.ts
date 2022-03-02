import { Router } from 'express';

import { authenticationRoutes } from './authentication.routes';
import { occupationAreaRoutes } from './occupationArea.routes';
import { organizationsRoutes } from './organizations.routes';
import { organizationTypesRoutes } from './organizationTypes.routes';
import { usersRoutes } from './users.routes';
import { userTypesRoutes } from './userTypes.routes';
import { volunteersRoutes } from './volunteers.routes';

const router = Router();

router.use(authenticationRoutes);
router.use('/usertypes', userTypesRoutes);
router.use('/users', usersRoutes);
router.use('/organizationtypes', organizationTypesRoutes);
router.use('/organizations', organizationsRoutes);
router.use('/occupationarea', occupationAreaRoutes);
router.use('/volunteers', volunteersRoutes);

export { router };
