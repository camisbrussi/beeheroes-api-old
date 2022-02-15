import { getRepository, Repository } from 'typeorm';

import { EntityType } from '@modules/entities/infra/typeorm/entities/EntityTypes'
import { IEntityTypesRepository } from '@modules/entities/repositories/IEntityTypesRepository'
import { ICreateEntityTypeDTO } from '@modules/entities/dtos/ICreateEntityTypeDTO';

class EntityTypesRepository implements IEntityTypesRepository{
  private repository: Repository<EntityType>

  constructor() {
    this.repository = getRepository(EntityType);
  }

  async create({ name, description }: ICreateEntityTypeDTO): Promise<EntityType> {
    const entityType = await this.repository.create({
      name,
      description
    });
    await this.repository.save(entityType);

     return entityType;
  }

  async list(): Promise<EntityType[]> {
    const entityType = await this.repository.find();
    return entityType;
  }

  async findByName(name: string): Promise<EntityType> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { EntityTypesRepository }