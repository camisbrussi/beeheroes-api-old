
import { EntityType } from '@modules/entities/infra/typeorm/entities/EntityTypes'
import { ICreateEntityTypeDTO } from '../dtos/ICreateEntityTypeDTO';

interface IEntityTypesRepository {
  findByName(name: string): Promise<EntityType>;
  list(): Promise<EntityType[]>
  create({ name, description }: ICreateEntityTypeDTO): Promise<EntityType>;
}

export { IEntityTypesRepository }