import { inject, injectable } from 'tsyringe';

import { IEntityTypesRepository } from '@modules/entities/repositories/IEntityTypesRepository';
import { AppError } from '@shared/errors/AppError';
import { EntityType } from '@modules/entities/infra/typeorm/entities/EntityTypes';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateEntityTypeUseCase{
  constructor(
    @inject('EntityTypesRepository')
    private entityTypeRepository: IEntityTypesRepository
  ){}

  async execute({ name, description }: IRequest): Promise<EntityType> {
    const entityTypeExist = await this.entityTypeRepository.findByName(name);

    if(entityTypeExist) {
      throw new AppError("Entity type already exists!")
    }

    const entityType = await this.entityTypeRepository.create({
      name,
      description
    });

    return entityType;
  }
}

export { CreateEntityTypeUseCase }