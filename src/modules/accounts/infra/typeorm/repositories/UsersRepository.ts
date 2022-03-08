import { getRepository, Repository } from 'typeorm';

import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    name,
    email,
    password,
    user_type_id,

    avatar,
  }: IUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      user_type_id,
      avatar,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.createQueryBuilder('user')
      .where('user.email =:email', { email })
      .getOne();

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.repository
      .createQueryBuilder('user')
      .where('user.id =:id', { id })
      .getOne();

    return user;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const users = await this.repository.findByIds(ids);
    return users;
  }

  async list(): Promise<User[]> {
    const user = await this.repository.find();
    return user;
  }

  async listUsersByUserType(user_type_id: number): Promise<User[]> {
    const users = await this.repository.find({ user_type_id });

    return users;
  }

  async filter({
    name, email, status, user_type_id,
  }: IUserDTO): Promise<User[]> {
    const usersQuery = await this.repository
      .createQueryBuilder('u')
      .where('1 = 1');

    if (name) {
      usersQuery.andWhere('name like :name', { name: `%${name}%` });
    }

    if (email) {
      usersQuery.andWhere('email like :email', { email: `%${email}%` });
    }

    if (status) {
      usersQuery.andWhere('status = :status', { status });
    }

    if (user_type_id) {
      usersQuery.andWhere('user_type_id = :user_type_id', { user_type_id });
    }

    const users = await usersQuery.getMany();

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
    const setUser: IUserDTO = { };

    if (name) setUser.name = name;
    if (email) setUser.email = email;
    if (password) setUser.password = password;
    if (status) setUser.status = status;
    if (user_type_id) setUser.user_type_id = user_type_id;

    const userTypeEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set(setUser)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return userTypeEdited.raw;
  }
}

export { UsersRepository };
