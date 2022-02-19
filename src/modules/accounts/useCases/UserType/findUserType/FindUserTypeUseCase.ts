import { inject, injectable } from 'tsyringe';

import { UserType } from '@modules/accounts/infra/typeorm/entities/UserTypes';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { AppError } from '@shared/errors/AppError';
import { IUserTypeDTO } from '@modules/accounts/dtos/IUserTypeDTO';

@injectable()
class FindUserTypeUseCase {
  constructor(
    @inject('UserTypesRepository')
    private userTypesRepository: IUserTypesRepository,
  ) { }

  async execute(id: string): Promise<UserType> {

    const usersType = await this.userTypesRepository.findById(id);

    return usersType;
  }
}

export { FindUserTypeUseCase };
