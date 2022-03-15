import { instanceToInstance } from 'class-transformer';

import { IUserDTO } from '../dtos/IUserDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    avatar_url,
    status,
  }: User): IUserDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      avatar_url,
      status,
    });
    return user;
  }
}

export { UserMap };
