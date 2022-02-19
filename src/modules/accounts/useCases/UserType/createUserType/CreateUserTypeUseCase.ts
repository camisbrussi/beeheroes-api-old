import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { UserType } from '@modules/accounts/infra/typeorm/entities/UserTypes';
import { IUserTypeDTO } from '@modules/accounts/dtos/IUserTypeDTO';

@injectable()
class CreateUserTypeUseCase{
  constructor(
    @inject('UserTypesRepository')
    private userTypeRepository: IUserTypesRepository
  ){}

  async execute({ name, description }: IUserTypeDTO): Promise<UserType> {
    const userTypeExist = await this.userTypeRepository.findByName(name);

    if(userTypeExist) {
      throw new AppError("User type already exists!")
    }

    const userType = await this.userTypeRepository.create({
      name,
      description
    });

    return userType;
  }
}

export { CreateUserTypeUseCase }