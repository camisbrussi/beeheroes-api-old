import { container } from 'tsyringe';

import { IEntityTypesRepository } from '@modules/entities/repositories/IEntityTypesRepository'
import { EntityTypesRepository } from '@modules/entities/infra/typeorm/repositories/EntityTypesRepository'
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { UserTypesRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTypeRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';


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