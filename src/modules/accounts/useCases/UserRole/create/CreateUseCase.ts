import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  roles_id: string[],
  user_id: string,
}

@injectable()
class CreateUserRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, roles_id }: IRequest): Promise<User> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) throw new AppError('User does not exists');

    const roleExists = await this.rolesRepository.findByIds(roles_id);

    if (!roleExists) {
      throw new AppError('Role does not exist');
    }

    userExists.roles = roleExists;

    await this.usersRepository.create(userExists);

    return userExists;
  }
}

export { CreateUserRoleUseCase };
