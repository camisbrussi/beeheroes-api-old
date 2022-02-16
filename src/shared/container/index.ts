import { container } from 'tsyringe';

import '@shared/container/providers';

import { IEntityTypesRepository } from '@modules/entities/repositories/IEntityTypesRepository'
import { EntityTypesRepository } from '@modules/entities/infra/typeorm/repositories/EntityTypesRepository'
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { UserTypesRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTypeRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';

container.registerSingleton<IEntityTypesRepository>(
  'EntityTypesRepository',
  EntityTypesRepository,
);

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