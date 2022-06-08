import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    password,
    avatar,
    address_id,
  }: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      avatar,
      address_id,
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
  }: IUserDTO): Promise<User[]> {
    const users = this.users.filter((user) => {
      if ((email && user.email.includes(email))
        || (name && user.name.includes(name))
        || (status && user.status === status)
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
    status,
    address_id,
  }: IUserDTO): Promise<User> {
    const findIndex = this.users.findIndex((user) => user.id === id);

    if (name) this.users[findIndex].name = name;
    if (email) this.users[findIndex].email = email;
    if (password) this.users[findIndex].password = password;
    if (status) this.users[findIndex].status = status;
    if (address_id) this.users[findIndex].address_id = address_id;

    return this.users[findIndex];
  }
}

export { UsersRepositoryInMemory };
