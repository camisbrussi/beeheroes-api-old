
import { EntityType } from '@modules/entities/infra/typeorm/entities/EntityTypes'

interface ICreateEntityTypeDTO {
  name: string;
  description: string;
}

interface IEntityTypesRepositoryDTO {
  name: string;
  description: string;
}

interface IEntityTypesRepository {
  findByName(name: string): Promise<EntityType>;
  list(): Promise<EntityType[]>
  create({ name, description }: IEntityTypesRepositoryDTO): Promise<EntityType>;
}

export { IEntityTypesRepository, ICreateEntityTypeDTO }