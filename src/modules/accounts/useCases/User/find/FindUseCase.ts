import { inject, injectable } from 'tsyringe';

import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute(id: string): Promise<UserMap> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    return UserMap.toDTO({
      id: user.id,
      status: user.status,
      name: user.name,
      email: user.email,
      is_volunteer: user.is_volunteer,
      avatar: user.avatar,
      address: user.address,
    });
  }
}

export { FindUserUseCase };
