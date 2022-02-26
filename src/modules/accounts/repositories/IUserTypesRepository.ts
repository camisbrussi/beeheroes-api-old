import { IUserTypeDTO } from '../dtos/IUserTypeDTO';
import { UserType } from '../infra/typeorm/entities/UserTypes';

interface IUserTypesRepository {
  create({ name, description }: IUserTypeDTO): Promise<UserType>;
  findByName(name: string): Promise<UserType>;
  findById(id: string): Promise<UserType>;
  list(): Promise<UserType[]>;
  update({ id, name, description }: IUserTypeDTO): Promise<UserType>
  delete(id: string): Promise<void>;
}

export { IUserTypesRepository };
