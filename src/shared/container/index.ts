import { container } from 'tsyringe';

import { IEntityTypesRepository } from '@modules/entities/repositories/IEntityTypesRepository'
import { EntityTypesRepository } from '@modules/entities/infra/typeorm/repositories/EntityTypeRepository'


container.registerSingleton<IEntityTypesRepository>(
  'EntityTypesRepository',
  EntityTypesRepository,
);