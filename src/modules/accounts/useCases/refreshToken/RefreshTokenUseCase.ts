import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
     @inject('UsersTokensRepository')
     private usersTokensRepository: IUsersTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
     @inject('DayjsDateProvider')
     private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    try {
      const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
      const user_id = sub;

      const userToken = await this.usersTokensRepository
        .findByUserIdAndRefreshToken(user_id, token);

      await this.usersTokensRepository.delete(userToken.id);

      const expires_date = this.dateProvider.addDays(
        auth.expires_refresh_token_days,
      );

      const refresh_token = sign({ email }, auth.secret_refresh_token, {
        subject: sub,
        expiresIn: auth.expires_in_refresh_token,
      });

      await this.usersTokensRepository.create({
        expires_date,
        refresh_token,
        user_id,
      });

      const user = await this.usersRepository.findByEmail(email);

      const roles = user.roles?.map((role) => role.name);
      const permissions = user.roles?.map(
        (role) => role.permissions?.map((permission) => permission.name),
      );

      const payload = {
        roles,
        permissions: permissions ? permissions[0] : [],
        name: user.name,
        email: user.email,
      };

      const newToken = sign({ payload }, auth.secret_token, {
        subject: user_id,
        expiresIn: auth.expires_in_token,
      });

      return {
        refresh_token,
        token: newToken,
      };
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { RefreshTokenUseCase };
