import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IRequestAddress } from '@modules/addresses/useCases/address/create/CreateUseCase';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string,
  name?:string,
  password?:string;
  email?:string;
  status?: number;
  address_id?:string;
  address?: IRequestAddress;
  is_volunteer?: boolean,
  avatar?: string;
}
@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
     @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({
    id,
    name,
    password,
    email,
    status,
    address_id,
    address,
    is_volunteer,
    avatar,
  }: IRequest): Promise<User> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('User already exists!');
    }

    console.log(name);

    let addressId: string;
    if (address) {
      const createdAddress = await this.addressesRepository.create(address);
      addressId = createdAddress.id;
    }

    let passwordHash;
    if (password) {
      passwordHash = await hash(password, 8);
    }

    const user = await this.usersRepository.update({
      id,
      name,
      password: passwordHash,
      email,
      status,
      address_id: addressId,
      is_volunteer,
      avatar,
    });

    if (address && address_id) {
      await this.addressesRepository.delete(address_id);
    }

    return user;
  }
}

export { UpdateUserUseCase };
