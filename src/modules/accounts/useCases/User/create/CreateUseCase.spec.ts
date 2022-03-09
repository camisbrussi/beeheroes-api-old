import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;

beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
  createUserUseCase = new CreateUserUseCase(
    usersRepositoryInMemory,
    userTypesRepositoryInMemory,
  );
});

describe('Create User ', () => {
  it('should be able to create a new user ', async () => {
    await userTypesRepositoryInMemory.create({
      id: 1,
      name: 'UserType',
    });
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
    await userTypesRepositoryInMemory.create({
      id: 2,
      name: 'UserType',
    });
    const user = {
      name: 'Name test',
      email: 'teste@beeheroes.com',
      password: '123456',
      user_type_id: 2,
    };

    await createUserUseCase.execute({
      name: user.name,
      email: user.email,
      password: user.password,
      user_type_id: 2,
    });

    await expect(
      createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
        user_type_id: 2,
      }),
    ).rejects.toEqual(new AppError(`User ${user.email} already exists`));
  });

  it('should be able to create a user  with status active by default', async () => {
    await userTypesRepositoryInMemory.create({
      id: 3,
      name: 'UserType',
    });
    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 3,
    });

    expect(user.status).toBe(Number(process.env.USER_STATUS_ACTIVE));
  });

  it('should not be able to create a new  with user type nonexistent', async () => {
    await expect(
      createUserUseCase.execute({
        name: 'Name User',
        email: 'teste@beeheroes.com',
        password: '123456',
        user_type_id: 5,
      }),
    ).rejects.toEqual(new AppError('User Types does not exist'));
  });
});
