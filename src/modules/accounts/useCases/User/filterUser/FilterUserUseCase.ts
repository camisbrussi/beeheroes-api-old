import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';

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
    status
  }: IUserDTO): Promise<User[]> {

    const users = await this.usersRepository.filter({
      name, 
      password, 
      email, 
      user_type_id, 
      status
    });

    if(!users){
      throw new AppError('User does not exist')
    }

    return users;
  }
}

export { FilterUserUseCase };