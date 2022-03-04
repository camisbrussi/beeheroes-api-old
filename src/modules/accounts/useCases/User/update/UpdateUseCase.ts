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
  user_type_id?: number;
  status?: number;
  address_id?:string;
  address?: IRequestAddress;
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
    user_type_id,
    status,
    address_id,
    address,
  }: IRequest): Promise<User> {
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('User already exists!');
    }

    let addressId: string;
    if (address) {
      const createdAddress = await this.addressesRepository.create(address);
      addressId = createdAddress.id;
    }

    const userType = await this.usersRepository.update({
      id,
      name,
      password,
      email,
      user_type_id,
      status,
      address_id: addressId,
    });

    if (address && address_id) {
      await this.addressesRepository.delete(address_id);
    }

    return userType;
  }
}

export { UpdateUserUseCase };
