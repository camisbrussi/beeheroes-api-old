import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    name,
    email,
    password,
    user_type_id,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ 
      name,
      email,
      password,
      user_type_id,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async list(): Promise<User[]> {
    const user = await this.repository.find();
    return user;
  }

  async listUsersByUserType(user_type_id: string): Promise<User[]> {
    const users = await this.repository.find({ user_type_id });

    return users;
  }
}

export { UsersRepository };