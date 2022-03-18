import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../../User/create/CreateUseCase';
import { AuthenticationUseCase } from './AuthenticationUseCase';

let authenticationUseCase: AuthenticationUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Authentication User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      addressesRepositoryInMemory,
    );
    dateProvider = new DayjsDateProvider();
    authenticationUseCase = new AuthenticationUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to authentication an user', async () => {
    const user = {
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      is_volunteer: false,
    };
    await createUserUseCase.execute(user);

    const result = await authenticationUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authentication an no existent user', async () => {
    const user = {
      email: 'userincorrect@test.com',
      password: '1234',
      name: 'User Test Error',
      is_volunteer: false,
    };

    await createUserUseCase.execute(user);

    await expect(authenticationUseCase.execute({
      email: 'false@email.com',
      password: user.password,
    })).rejects.toEqual(new AppError('Email or password incorrect'));
  });

  it('should not be able to authentication with incorrect password', async () => {
    const user = {
      email: 'passwordincorrect@test.com',
      password: '1234',
      name: 'User Test Error',
      is_volunteer: false,
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
