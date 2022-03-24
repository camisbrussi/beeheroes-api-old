import { instanceToInstance } from 'class-transformer';

import { IUserDTO } from '../dtos/IUserDTO';

type User = {
  id: string;
  status: number;
  name: string;
  email: string;
  avatar_url: string;
  is_volunteer: boolean;
  address: {
    city: string;
    uf: string;
  }
}

class UserMap {
  static toDTO({
    id,
    status,
    name,
    email,
    avatar_url,
    is_volunteer,
    address,
  }: User): IUserDTO {
    const organization = instanceToInstance({
      id,
      status,
      name,
      email,
      avatar_url,
      address,
      is_volunteer,
    });
    return organization;
  }
}

export { UserMap };
