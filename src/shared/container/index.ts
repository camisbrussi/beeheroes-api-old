import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { UserTypesRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTypeRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { AddressesRepository } from '@modules/addresses/infra/typeorm/repositories/AddressesRepository';
import { PhonesRepository } from '@modules/addresses/infra/typeorm/repositories/PhonesRepository';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IPhonesRepository } from '@modules/addresses/repositories/IPhonesRepository';
import { DonationsRepository } from '@modules/donations/infra/typeorm/repositories/DonationsRepository';
import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';
import { OrganizationTypesRepository } from '@modules/organizations/infra/typeorm/repositories/OrganizationTypesRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/typeorm/repositories/OrganzationsRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { ProjectsRepository } from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';
import { IProjectsRepository } from '@modules/projects/repositories/IProjectsRepository';
import { OccupationsAreaRepository } from '@modules/volunteers/infra/typeorm/repositories/OccupationsAreaRepository';
import { VolunteersRepository } from '@modules/volunteers/infra/typeorm/repositories/VolunteersRepository';
import { IOccupationsAreaRepository } from '@modules/volunteers/repositories/IOccupationsAreaRepository';
import { IVolunteersRepository } from '@modules/volunteers/repositories/IVolunteersRepository';

container.registerSingleton<IUserTypesRepository>(
  'UserTypesRepository',
  UserTypesRepository,
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

container.registerSingleton<IPhonesRepository>(
  'PhonesRepository',
  PhonesRepository,
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IDonationsRepository>(
  'DonationsRepository',
  DonationsRepository,
);
