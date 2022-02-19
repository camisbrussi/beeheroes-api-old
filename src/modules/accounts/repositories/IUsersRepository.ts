import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository{
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  listUsersByUserType(user_type_id: string): Promise<User[]>;
  list(): Promise<User[]>
}

export { IUsersRepository }