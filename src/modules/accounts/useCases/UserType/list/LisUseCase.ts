import { inject, injectable } from 'tsyringe';

import { UserType } from '@modules/accounts/infra/typeorm/entities/UserTypes';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';

@injectable()
class ListUserTypesUseCase {
  constructor(
    @inject('UserTypesRepository')
    private userTypesRepository: IUserTypesRepository,
  ) { }

  async execute(): Promise<UserType[]> {
    const usersTypes = await this.userTypesRepository.list();

    return usersTypes;
  }
}

export { ListUserTypesUseCase };
