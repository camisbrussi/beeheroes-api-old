import { ICreateUserTypeDTO } from '@modules/accounts/dtos/ICreateUserTypeDTO';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { getRepository, Repository } from 'typeorm';
import { UserType } from '../entities/UserTypes';

class UserTypesRepository implements IUserTypesRepository{
  private repository: Repository<UserType>

  constructor() {
    this.repository = getRepository(UserType);
  }

  async create({ name, description }: ICreateUserTypeDTO): Promise<UserType> {
    const userType = await this.repository.create({
      name,
      description
    });
    await this.repository.save(userType);

     return userType;
  }

  async list(): Promise<UserType[]> {
    const userType = await this.repository.find();
    return userType;
  }

  async findByName(name: string): Promise<UserType> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { UserTypesRepository }