import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
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
      throw new AppError('User email is already registered!');
    }

    let addressId: string;
    if (user.address) {
      const createdAddress = await this.addressesRepository.create(user.address);
      addressId = createdAddress.id;
    }

    const passwordHash = await hash(user.password, 8);

    const newUser = await this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: passwordHash,
      is_volunteer: true,
      address_id: addressId,
      avatar: user.avatar,
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
