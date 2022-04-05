import { instanceToInstance } from 'class-transformer';

import { Address } from '@modules/addresses/infra/typeorm/entities/Address';

import { IUserDTO } from '../dtos/IUserDTO';

type User = {
  id: string;
  status: number;
  name: string;
  email: string;
  avatar: string;
  is_volunteer: boolean;
  address: Address;
}

class UserMap {
  static toDTO({
    id,
    status,
    name,
    email,
    avatar,
    is_volunteer,
    address,
  }: User): IUserDTO {
    const organization = instanceToInstance({
      id,
      status,
      name,
      email,
      avatar,
      address,
      is_volunteer,
    });
    return organization;
  }
}

export { UserMap };
