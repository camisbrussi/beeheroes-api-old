import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  payload: {
    email: string;
  }
}

interface ITokenResponse {
   user: {
    name: string;
    email: string,
  },
  roles: string[];
  permissions: string[];
}

@injectable()
class MeUseCase {
  constructor(
     @inject('UsersRepository')
     private usersRepository: IUsersRepository,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    try {
      const { payload } = verify(token, auth.secret_token) as IPayload;
      const user = await this.usersRepository.findByEmail(payload.email);

      if (!user) {
        throw new AppError('Invalid token!', 401);
      }

      const roles = user.roles?.map((role) => role.name);
      const permissions = user.roles?.map(
        (role) => role.permissions?.map((permission) => permission.name),
      );

      return {
        user: {
          name: user.name,
          email: user.email,
        },
        roles,
        permissions: permissions ? permissions[0] : [],
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { MeUseCase };
