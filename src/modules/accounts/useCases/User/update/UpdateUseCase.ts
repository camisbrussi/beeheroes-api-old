import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string,
  name?:string,
  password?:string;
  email?:string;
  status?: number;
}
@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    name,
    password,
    email,
    status,

  }: IRequest): Promise<User> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('User already exists!');
    }

    const user = await this.usersRepository.update({
      id,
      name,
      password,
      email,
      status,
    });

    return user;
  }
}

export { UpdateUserUseCase };
