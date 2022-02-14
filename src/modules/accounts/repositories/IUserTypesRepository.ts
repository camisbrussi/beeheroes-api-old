import { ICreateUserTypeDTO } from '../dtos/ICreateUserTypeDTO'
import { UserType } from '../infra/typeorm/entities/UserTypes'

interface IUserTypesRepository {
  findByName(name: string): Promise<UserType>;
  list(): Promise<UserType[]>
  create({ name, description }: ICreateUserTypeDTO): Promise<UserType>;
}

export { IUserTypesRepository }