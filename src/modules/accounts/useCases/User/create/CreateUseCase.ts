import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id?: string;
  name: string;
  email: string;
  password: string;
  user_type_id: number;
  avatar?: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    name,
    email,
    password,
    user_type_id,
    avatar,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(`User ${email} already exists`);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      id,
      name,
      email,
      password: passwordHash,
      user_type_id,
      avatar,
    });

    return user;
  }
}

export { CreateUserUseCase };
