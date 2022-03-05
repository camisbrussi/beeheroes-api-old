import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AddressesRepositoryInMemory } from '@modules/addresses/repositories/in-memory/AddressRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;

beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  addressesRepositoryInMemory = new AddressesRepositoryInMemory();
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    addressesRepositoryInMemory,
  );
});

describe('Create User ', () => {
  it('should be able to create a new user ', async () => {
    const user = {
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 1,
    };

    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);
    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to create a new  with email exists', async () => {
    const user = {
      name: 'Name test',
      email: 'teste@beeheroes.com',
      password: '123456',
      user_type_id: 1,
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      user_type_id: 1,
    });

    await expect(
      createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        user_type_id: 1,
      }),
    ).rejects.toEqual(new AppError(`User ${user.email} already exists`));
  });

  it('should be able to create a user  with status active by default', async () => {
    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 1,
    });

    expect(user.status).toBe(Number(process.env.USER_STATUS_ACTIVE));
  });

  it('should be able to create a new user with address', async () => {
    const user = {
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 1,
      address: {
        street: 'Street Example',
        number: '123',
        complement: '123',
        district: 'District',
        cep: 12345,
        city_id: 1,
      },
    };

    await createUserUseCase.execute(user);

    const userCreated = await usersRepositoryInMemory.findByEmail(user.email);
    expect(userCreated).toHaveProperty('id');
  });
});
