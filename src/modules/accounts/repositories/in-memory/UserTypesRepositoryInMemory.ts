import { IUserTypeDTO } from '@modules/accounts/dtos/IUserTypeDTO';
import { UserType } from '@modules/accounts/infra/typeorm/entities/UserTypes';

import { IUserTypesRepository } from '../IUserTypesRepository';

class UserTypeRepositoryInMemory implements IUserTypesRepository {
  userTypes: UserType[] = [];

  async create({
    name,
    description,
  }: IUserTypeDTO): Promise<UserType> {
    const userTypes = new UserType();

    const userType = Object.assign(userTypes, {
      name,
      description,
    });

    this.userTypes.push(userTypes);

    return userType;
  }

  async findByName(name: string): Promise<UserType> {
    const userType = this.userTypes.find((userType) => userType.name === name);
    return userType;
  }

  async findById(id: string): Promise<UserType> {
    const userType = this.userTypes.find((userType) => userType.id === id);
    return userType;
  }

  async list(): Promise<UserType[]> {
    const all = this.userTypes;
    return all;
  }

  async update({ id, name, description }: IUserTypeDTO): Promise<UserType> {
    const findIndex = this.userTypes.findIndex((userType) => userType.id === id);

    if (description) this.userTypes[findIndex].description = description;
    if (name) this.userTypes[findIndex].name = name;

    return this.userTypes[findIndex];
  }

  async delete(id: string): Promise<void> {
    const userType = this.userTypes.find((ut) => ut.id === id);
    this.userTypes.splice(this.userTypes.indexOf(userType));
  }
}

export { UserTypeRepositoryInMemory };
