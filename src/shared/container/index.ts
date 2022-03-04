import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { UserTypesRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTypeRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { AddressRepository } from '@modules/address/infra/typeorm/repositories/AddressRepository';
import { IAddressRepository } from '@modules/address/repositories/IAddressRepository';
import { OrganizationTypesRepository } from '@modules/organizations/infra/typeorm/repositories/OrganizationTypesRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/typeorm/repositories/OrganzationsRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { OccupationAreaRepository } from '@modules/volunteers/infra/typeorm/repositories/OccupationAreaRepository';
import { VolunteersRepository } from '@modules/volunteers/infra/typeorm/repositories/VolunteersRepository';
import { IOccupationAreaRepository } from '@modules/volunteers/repositories/IOccupationAreaRepository';
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

container.registerSingleton<IOccupationAreaRepository>(
  'OccupationAreaRepository',
  OccupationAreaRepository,
);

container.registerSingleton<IVolunteersRepository>(
  'VolunteersRepository',
  VolunteersRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);
