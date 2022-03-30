import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Volunteer } from '@modules/accounts/infra/typeorm/entities/Volunteer';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IRequestAddress } from '@modules/addresses/useCases/address/create/CreateUseCase';
import { AppError } from '@shared/errors/AppError';

type UserRequest = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  is_volunteer: boolean;
  address?: IRequestAddress;
}

type VolunteerRequest = {
  id?: string
  profession: string;
  description?: string,
  occupation_area_id: string,
  user_id: string,
}

interface IRequest {
  user: UserRequest;
  volunteer: VolunteerRequest;
}

@injectable()
class CreateUserAndVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
     @inject('UsersRepository')
    private usersRepository: IUsersRepository,
     @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({
    user,
    volunteer,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    let addressId: string;
    if (user.address) {
      const createdAddress = await this.addressesRepository.create(user.address);
      addressId = createdAddress.id;
    }

    const newUser = await this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      is_volunteer: false,
    });

    await this.volunteersRepository.create({
      id: newUser.id,
      profession: volunteer.profession,
      description: volunteer.description,
      occupation_area_id: volunteer.occupation_area_id,
      user_id: newUser.id,

    });

    return newUser;
  }
}

export { CreateUserAndVolunteerUseCase };
