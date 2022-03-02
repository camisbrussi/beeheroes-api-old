import { getRepository, Repository } from 'typeorm';

import { IUserTypeDTO } from '@modules/accounts/dtos/IUserTypeDTO';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';

import { UserType } from '../entities/UserTypes';

class UserTypesRepository implements IUserTypesRepository {
  private repository: Repository<UserType>

  constructor() {
    this.repository = getRepository(UserType);
  }

  async create({ name, description }: IUserTypeDTO): Promise<UserType> {
    const userType = this.repository.create({
      name,
      description,
    });
    await this.repository.save(userType);

    return userType;
  }

  async list(): Promise<UserType[]> {
    const userType = await this.repository.find();
    return userType;
  }

  async findByName(name: string): Promise<UserType> {
    const userType = await this.repository.findOne({ name });
    return userType;
  }

  async findById(id: number): Promise<UserType> {
    const userType = await this.repository.findOne({ id });
    return userType;
  }

  async update({ id, name, description }: IUserTypeDTO): Promise<UserType> {
    const setUserType: IUserTypeDTO = {};

    if (name) setUserType.name = name;
    if (description) setUserType.description = description;

    const userTypeEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set(setUserType)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return userTypeEdited.raw;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UserTypesRepository };
