import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { UserType } from '@modules/accounts/infra/typeorm/entities/UserTypes';
import { IUserTypeDTO } from '@modules/accounts/dtos/IUserTypeDTO';

interface IRequest {
  id: string,
  name?:string,
  description?:string;
}
@injectable()
class UpdateUserTypeUseCase{
  constructor(
    @inject('UserTypesRepository')
    private userTypeRepository: IUserTypesRepository
  ){}

  async execute({ id, name, description }: IRequest): Promise<UserType> {
    const userTypeExist = await this.userTypeRepository.findByName(name);

    if(userTypeExist) {
      throw new AppError("User type already exists!")
    }
    
    const userType = await this.userTypeRepository.update({
      id,
      name,
      description
    });

    return userType;
  }
}

export { UpdateUserTypeUseCase }