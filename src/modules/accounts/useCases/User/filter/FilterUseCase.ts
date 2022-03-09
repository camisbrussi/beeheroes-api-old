import { inject, injectable } from 'tsyringe';

import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FilterUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    name,
    password,
    email,
    user_type_id,
    status,
  }: IUserDTO): Promise<User[]> {
    const users = await this.usersRepository.filter({
      name,
      password,
      email,
      user_type_id,
      status,
    });

    if (users.length === 0) {
      throw new AppError('User does not exist');
    }

    return users;
  }
}

export { FilterUserUseCase };
