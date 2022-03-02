import { IUserDTO } from '../dtos/IUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository{
  create({
    name,
    email,
    status,
    user_type_id,
  }: IUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByIds(ids: string[]): Promise<User[]>
  listUsersByUserType(user_type_id: number): Promise<User[]>;
  list(): Promise<User[]>
  filter({
    name,
    email,
    status,
    user_type_id,
  }: IUserDTO): Promise<User[]>;
  update({
    id,
    name,
    email,
    status,
    user_type_id,
    password,
  }: IUserDTO): Promise<User>;
}

export { IUsersRepository };
