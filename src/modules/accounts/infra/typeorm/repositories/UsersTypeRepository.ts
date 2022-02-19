import { IUserTypeDTO } from '@modules/accounts/dtos/IUserTypeDTO';
import { IUserTypesRepository } from '@modules/accounts/repositories/IUserTypesRepository';
import { getRepository, Repository } from 'typeorm';
import { UserType } from '../entities/UserTypes';

class UserTypesRepository implements IUserTypesRepository{
  private repository: Repository<UserType>

  constructor() {
    this.repository = getRepository(UserType);
  }

  async create({ name, description }: IUserTypeDTO): Promise<UserType> {
    const userType = this.repository.create({
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
    const userType = await this.repository.findOne({ name });
    return userType;
  }

  async findById(id: string): Promise<UserType> {
    const userType = await this.repository.findOne({ id });
    return userType;
  }

  async update({ id, name, description }: IUserTypeDTO): Promise<UserType> {

    const setUserType = [];

    if(name) setUserType.push(name);
    if(description) setUserType.push(description);

    const userTypeEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set({name, description})
      .where('id = :id')
      .setParameters({ id })
      .execute();

      return userTypeEdited.raw;
  }

  async deleteById( id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UserTypesRepository }