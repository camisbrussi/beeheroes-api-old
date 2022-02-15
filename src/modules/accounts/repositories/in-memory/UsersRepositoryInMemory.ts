import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  
  async create({
    name, email,password, user_type_id
  }: ICreateUserDTO ): Promise<User> {
    const user = new User();
    
    Object.assign(user, {
      name, email, password, user_type_id
    });

    this.users.push(user);

    return (user)
  }

  async list(): Promise<User[]> {
    const all = this.users;
    return all;
  }
}

export {  UsersRepositoryInMemory }