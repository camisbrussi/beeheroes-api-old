import { container } from 'tsyringe';

import '@shared/container/providers';

import { OccupationsAreaRepository } from '@modules/accounts/infra/typeorm/repositories/OccupationsAreaRepository';
import { PermissionsRepository } from '@modules/accounts/infra/typeorm/repositories/PermissionRepository';
import { RolesRepository } from '@modules/accounts/infra/typeorm/repositories/RolesRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { VolunteersRepository } from '@modules/accounts/infra/typeorm/repositories/VolunteersRepository';
import { IOccupationsAreaRepository } from '@modules/accounts/repositories/IOccupationsAreaRepository';
import { IPermissionsRepository } from '@modules/accounts/repositories/IPermissionsRepository';
import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';
import { AddressesRepository } from '@modules/addresses/infra/typeorm/repositories/AddressesRepository';
import { CitiesRepository } from '@modules/addresses/infra/typeorm/repositories/CitiesRepository';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { ICitiesRepository } from '@modules/addresses/repositories/ICitiesRepository';
import { DonationsRepository } from '@modules/donations/infra/typeorm/repositories/DonationsRepository';
import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';
import { OrganizationImagesRepository } from '@modules/organizations/infra/typeorm/repositories/OrganizationImagesRepository';
import { OrganizationTypesRepository } from '@modules/organizations/infra/typeorm/repositories/OrganizationTypesRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/typeorm/repositories/OrganzationsRepository';
import { IOrganizationImagesRepository } from '@modules/organizations/repositories/IOrganizationImagesRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { EvaluationsRepository } from '@modules/projects/infra/typeorm/repositories/EvaluationsRepository';
import { ProjectsRepository } from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';
import { SubscriptionsRepository } from '@modules/projects/infra/typeorm/repositories/SubscriptionsRepository';
import { IEvaluationsRepository } from '@modules/projects/repositories/IEvaluationRepository';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { ISubscriptionsRepository } from '@modules/projects/repositories/ISubscriptiosRepository';

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<IOrganizationTypesRepository>(
  'OrganizationTypesRepository',
  OrganizationTypesRepository,
);

container.registerSingleton<IOrganizationsRepository>(
  'OrganizationsRepository',
  OrganizationsRepository,
);

container.registerSingleton<IOccupationsAreaRepository>(
  'OccupationsAreaRepository',
  OccupationsAreaRepository,
);

container.registerSingleton<IVolunteersRepository>(
  'VolunteersRepository',
  VolunteersRepository,
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IDonationsRepository>(
  'DonationsRepository',
  DonationsRepository,
);

container.registerSingleton<IOrganizationImagesRepository>(
  'OrganizationImagesRepository',
  OrganizationImagesRepository,
);

container.registerSingleton<ISubscriptionsRepository>(
  'SubscriptionsRepository',
  SubscriptionsRepository,
);

container.registerSingleton<IEvaluationsRepository>(
  'EvaluationsRepository',
  EvaluationsRepository,
);

container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository,
);
