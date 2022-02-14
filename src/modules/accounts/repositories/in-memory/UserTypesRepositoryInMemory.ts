import { ICreateUserTypeDTO } from '@modules/accounts/dtos/ICreateUserTypeDTO';
import { UserType } from '@modules/accounts/infra/typeorm/entities/UserTypes';
import { IUserTypesRepository } from '../IUserTypesRepository';

class UserTypeRepositoryInMemory implements IUserTypesRepository {
  userTypes: UserType[] = [];

  async findByName(name: string): Promise<UserType> {
    const userType = this.userTypes.find((userType) => userType.name === name);
    return userType;
  }

  async list(): Promise<UserType[]> {
    const all = this.userTypes;
    return all;
  }

  async create({
    name,
    description
  }: ICreateUserTypeDTO): Promise<UserType> {
    const userTypes = new UserType();
    
    const userType = Object.assign(userTypes, {
      name,
      description
    });

    this.userTypes.push( userTypes );

    return userType;
  }
}

export { UserTypeRepositoryInMemory }