import { inject, injectable } from 'tsyringe';

import { UserType } from '@modules/accounts/infra/typeorm/entities/UserTypes';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';

@injectable()
class FindUserTypeUseCase {
  constructor(
    @inject('UserTypesRepository')
    private userTypesRepository: IUserTypesRepository,
  ) { }

  async execute(id: number): Promise<UserType> {
    const usersType = await this.userTypesRepository.findById(id);

    return usersType;
  }
}

export { FindUserTypeUseCase };
