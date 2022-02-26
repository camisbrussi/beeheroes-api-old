import { container } from 'tsyringe';

import '@shared/container/providers';

import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { UserTypesRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTypeRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { OrganizationTypesRepository } from '@modules/organizations/infra/typeorm/repositories/OrganizationTypesRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/typeorm/repositories/OrganzationsRepository';


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

container.registerSingleton<IOrganizationsRepository>(
  'OrganizationsRepository',
  OrganizationsRepository,
);

container.registerSingleton<IOrganizationTypesRepository>(
  'OrganizationTypesRepository',
  OrganizationTypesRepository,
);