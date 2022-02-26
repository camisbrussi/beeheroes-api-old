import { container } from 'tsyringe';

import '@shared/container/providers';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { UserTypesRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTypeRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { OrganizationTypesRepository } from '@modules/organizations/infra/typeorm/repositories/OrganizationTypesRepository';
import { OrganizationsRepository } from '@modules/organizations/infra/typeorm/repositories/OrganzationsRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';

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
