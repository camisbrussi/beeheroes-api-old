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
    status,
    is_volunteer,
  }: IUserDTO): Promise<User[]> {
    const users = await this.usersRepository.filter({
      name,
      password,
      email,
      status,
      is_volunteer,
    });

    if (users.length === 0) {
      throw new AppError('User does not exist');
    }

    return users;
  }
}

export { FilterUserUseCase };
