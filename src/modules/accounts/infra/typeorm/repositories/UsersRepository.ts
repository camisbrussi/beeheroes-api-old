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
    avatar,
    roles,
    address_id,
    is_volunteer,
  }: IUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      avatar,
      roles,
      address_id,
      is_volunteer,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'addresses')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('user.email =:email', { email })
      .getOne();

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'addresses')
      .leftJoinAndSelect('addresses.city', 'cities')
      .leftJoinAndSelect('cities.state', 'states')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('user.id =:id', { id })
      .getOne();

    return user;
  }

  async findByIds(ids: string[]): Promise<User[]> {
    const users = await this.repository.findByIds(ids);
    return users;
  }

  async filter({
    is_volunteer,
    name,
    email,
    status,
  }: IUserDTO): Promise<User[]> {
    const usersQuery = await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'addresses')
      .leftJoinAndSelect('addresses.city', 'cities')
      .leftJoinAndSelect('cities.state', 'states')
      .where('1 = 1');

    if (name) {
      usersQuery.andWhere('user.name ilike :name', { name: `%${name}%` });
    }

    if (email) {
      usersQuery.andWhere('user.email like :email', { email: `%${email}%` });
    }

    if (status) {
      usersQuery.andWhere('user.status = :status', { status });
    }

    if (is_volunteer) {
      usersQuery.andWhere('user.is_volunteer = :is_volunteer', { is_volunteer });
    }

    const users = await usersQuery.getMany();

    return users;
  }

  async update({
    id,
    name,
    email,
    password,
    status,
    address_id,
    is_volunteer,
  }: IUserDTO): Promise<User> {
    const setUser: IUserDTO = { };

    if (name) setUser.name = name;
    if (email) setUser.email = email;
    if (password) setUser.password = password;
    if (status) setUser.status = status;
    if (address_id) setUser.address_id = address_id;
    if (is_volunteer) setUser.is_volunteer = is_volunteer;

    const userEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set(setUser)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return userEdited.raw;
  }
}

export { UsersRepository };
