import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUserTypeDTO } from '@modules/accounts/dtos/IUserTypeDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IRequest {
  id: string,
  name?:string,
  password?:string;
  email?:string;
  user_type_id?: string;
}
@injectable()
class UpdateUserUseCase{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  async execute({ id, name, password, email, user_type_id }: IRequest): Promise<User> {
    const userExist = await this.usersRepository.findByEmail(email);

    if(userExist) {
      throw new AppError("User already exists!")
    }
    
    const userType = await this.usersRepository.update({
     id, 
     name, 
     password, 
     email, 
     user_type_id
    });

    return userType;
  }
}

export { UpdateUserUseCase }