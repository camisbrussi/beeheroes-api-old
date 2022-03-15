import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();

  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
  );
});

describe('Create User ', () => {
  it('should be able to create a new user ', async () => {
    const user = {
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
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
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    await expect(
      createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    ).rejects.toEqual(new AppError(`User ${user.email} already exists`));
  });

  it('should be able to create a user  with status active by default', async () => {
    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
    });

    expect(user.status).toBe(Number(process.env.USER_STATUS_ACTIVE));
  });
});
