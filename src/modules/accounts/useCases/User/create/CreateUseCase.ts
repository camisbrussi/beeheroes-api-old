import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
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
    @inject('UserTypesRepository')
    private userTypeRepository: IUserTypesRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    user_type_id,
    avatar,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    const userTypeExists = await this.userTypeRepository.findById(user_type_id);

    if (userAlreadyExists) {
      throw new AppError(`User ${email} already exists`);
    }

    if (!userTypeExists) {
      throw new AppError('User Types does not exist');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
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
