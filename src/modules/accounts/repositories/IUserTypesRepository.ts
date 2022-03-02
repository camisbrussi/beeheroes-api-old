import { IUserTypeDTO } from '../dtos/IUserTypeDTO';
import { UserType } from '../infra/typeorm/entities/UserTypes';

interface IUserTypesRepository {
  create({ name, description }: IUserTypeDTO): Promise<UserType>;
  findByName(name: string): Promise<UserType>;
  findById(id: number): Promise<UserType>;
  list(): Promise<UserType[]>;
  update({ id, name, description }: IUserTypeDTO): Promise<UserType>
  delete(id: number): Promise<void>;
}

export { IUserTypesRepository };
