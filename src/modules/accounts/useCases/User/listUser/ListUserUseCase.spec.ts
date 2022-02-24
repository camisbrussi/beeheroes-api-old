import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { ListUsersUseCase } from './ListUserUseCase';

let listUsersUseCase: ListUsersUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('List Users', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    listUsersUseCase = new ListUsersUseCase(usersRepositoryInMemory);
  });

  it('should be abe to list all user', async () => {
    const newUser = await usersRepositoryInMemory.create({
      name: 'Admin',
      email: 'supertest@beeheroes.com',
      password: '123456',
      user_type_id: 'admin',
    });

    const user = await listUsersUseCase.execute();

    expect(user).toEqual([newUser])
  });
})