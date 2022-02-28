import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name, email, password, user_type_id,
  }: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name, email, password, user_type_id,
    });

    this.users.push(user);

    return (user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const allUsers = this.users
      .filter((user) => ids.includes(user.id));

    return allUsers;
  }

  async filter({
    name,
    email,
    status,
    user_type_id,
  }: IUserDTO): Promise<User[]> {
    const users = this.users.filter((user) => {
      if ((email && email.includes(email))
        || (name && user.name.includes(name))
        || (status && user.status === status)
        || (user_type_id && user.user_type_id === user_type_id)
      ) {
        return user;
      }
      return null;
    });

    return users;
  }

  async update({
    id,
    name,
    email,
    password,
    user_type_id,
    status,
  }: IUserDTO): Promise<User> {
    const findIndex = this.users.findIndex((user) => user.id === id);

    if (name) this.users[findIndex].name = name;
    if (email) this.users[findIndex].email = email;
    if (password) this.users[findIndex].password = password;
    if (status) this.users[findIndex].status = status;
    if (user_type_id) this.users[findIndex].user_type_id = user_type_id;

    return this.users[findIndex];
  }

  async list(): Promise<User[]> {
    const all = this.users;
    return all;
  }

  async listUsersByUserType(user_type_id: string): Promise<User[]> {
    const users = this.users.filter((user) => {
      if (user.user_type_id === user_type_id) {
        return user;
      }
      return null;
    });
    return users;
  }
}

export { UsersRepositoryInMemory };
