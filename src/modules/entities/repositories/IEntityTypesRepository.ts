
import { EntityType } from '@modules/entities/infra/typeorm/entities/EntityTypes'
import { IEntityTypeDTO } from '../dtos/IEntityTypeDTO';

interface IEntityTypesRepository {
  findByName(name: string): Promise<EntityType>;
  list(): Promise<EntityType[]>
  create({ name, description }: IEntityTypeDTO): Promise<EntityType>;
}

export { IEntityTypesRepository }