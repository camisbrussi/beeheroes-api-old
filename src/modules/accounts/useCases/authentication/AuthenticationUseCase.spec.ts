import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticationUseCase } from './AuthenticationUseCase';

let authenticationUseCase: AuthenticationUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe('Authentication User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticationUseCase = new AuthenticationUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authentication an user', async () => {
    const user: ICreateUserDTO = {
      email: 'user@test.com',
      password: '1234',
      name: 'User test',
      user_type_id: 'admin'
    };
    await createUserUseCase.execute(user);

    const result = await authenticationUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authentication an no existent user', async () => {
    const user: ICreateUserDTO = {
      email: 'userincorrect@test.com',
      password: '1234',
      name: 'User Test Error',
      user_type_id: 'admin',
    };

    await createUserUseCase.execute(user);
  
    await expect(authenticationUseCase.execute({
      email: 'false@email.com',
      password: user.password,
    })).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authentication with incorrect password', async () => {
    const user: ICreateUserDTO = {
      email: 'passwordincorrect@test.com',
      password: '1234',
      name: 'User Test Error',
      user_type_id: 'admin',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticationUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});