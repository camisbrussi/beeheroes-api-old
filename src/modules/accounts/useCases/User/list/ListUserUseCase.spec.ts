import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';

import { ListUsersUseCase } from './ListUserUseCase';

let listUsersUseCase: ListUsersUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;

describe('List Users', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it('should be abe to list all user', async () => {
    await userTypesRepositoryInMemory.create({
      id: 1,
      name: 'UserType',
    });

    const newUser = await usersRepositoryInMemory.create({
      name: 'Admin',
      email: 'supertest@beeheroes.com',
      password: '123456',
      user_type_id: 1,
    });

    const user = await listUsersUseCase.execute();

    expect(user).toEqual([newUser]);
  });
});
