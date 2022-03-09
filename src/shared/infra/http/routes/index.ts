import { Router } from 'express';

import { authenticationRoutes } from './authentication.routes';
import { donationsRoutes } from './donations.routes';
import { evaluationsRoutes } from './evaluation.routes';
import { occupationAreaRoutes } from './occupationArea.routes';
import { organizationsRoutes } from './organizations.routes';
import { organizationTypesRoutes } from './organizationTypes.routes';
import { projectsRoutes } from './projects.routes';
import { subscriptionsRoutes } from './subscriptions.routes';
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
router.use('/projects', projectsRoutes);
router.use('/donations', donationsRoutes);
router.use('/subscriptions', subscriptionsRoutes);
router.use('/evaluations', evaluationsRoutes);

export { router };
