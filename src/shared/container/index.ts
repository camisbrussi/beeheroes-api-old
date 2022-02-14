import { container } from 'tsyringe';

import { IEntityTypesRepository } from '@modules/entities/repositories/IEntityTypesRepository'
import { EntityTypesRepository } from '@modules/entities/infra/typeorm/repositories/EntityTypeRepository'
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { UserTypesRepository } from '@modules/accounts/infra/typeorm/repositories/UserTypeRepository';


container.registerSingleton<IEntityTypesRepository>(
  'EntityTypesRepository',
  EntityTypesRepository,
);

container.registerSingleton<IUserTypesRepository>(
  'UserTypesRepository',
  UserTypesRepository,
);