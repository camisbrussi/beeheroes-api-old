import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IAddressRepository } from '@modules/address/repositories/IAddressRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id?: string;
  name: string;
  email: string;
  password: string;
  user_type_id: number;
  address?: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    cep: number,
    city_id: number,
  },
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    id,
    name,
    email,
    password,
    user_type_id,
    address,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(`User ${email} already exists`);
    }

    let addressId: string;
    if (address) {
      const createdAddress = await this.addressRepository.create(address);
      addressId = createdAddress.id;
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      id,
      name,
      email,
      password: passwordHash,
      user_type_id,
      address_id: addressId,
    });

    return user;
  }
}

export { CreateUserUseCase };
