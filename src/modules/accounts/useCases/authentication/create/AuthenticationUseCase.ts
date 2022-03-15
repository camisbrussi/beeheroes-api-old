import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string,
  password:string
}
interface IResponse {
  user: {
    name: string;
    email: string,
  },
  token: string;
  refresh_token: string;
  roles: string[];
  permissions: string[];
}

@injectable()
class AuthenticationUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || user.status === Number(process.env.USER_STATUS_INACTIVE)) {
      throw new AppError('Email or password incorrect');
    }

    if (user.status === Number(process.env.USER_STATUS_BLOCK)) {
      throw new AppError('Blocked access');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

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

    const token = sign({ payload }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
      roles,
      permissions: permissions ? permissions[0] : [],
    };

    return tokenReturn;
  }
}

export { AuthenticationUseCase };
