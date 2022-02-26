import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { FilterUserUseCase } from './FilterUseCase';

let filterUserUseCase: FilterUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('List Users', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    filterUserUseCase = new FilterUserUseCase(usersRepositoryInMemory);
  });

  it('should be abe to filter user for name', async () => {
    const newUser1: IUserDTO = {
      name: 'User',
      email: 'teste@beeheroes',
      password: 'test',
      user_type_id: 'test',
    };

    const newUser2: IUserDTO = {
      name: 'User',
      email: 'teste2@beeheroes',
      password: 'test',
      user_type_id: 'test',
    };

    await usersRepositoryInMemory.create(newUser1);
    await usersRepositoryInMemory.create(newUser2);

    const users = await filterUserUseCase.execute({ name: 'User' });

    expect(users.length).toBe(2);
  });

  it('should be abe to filter user for name and user type', async () => {
    const newUser1: IUserDTO = {
      name: 'User',
      email: 'teste@beeheroes',
      password: 'test',
      user_type_id: 'test',
    };

    const newUser2: IUserDTO = {
      name: 'User',
      email: 'teste2@beeheroes',
      password: 'test',
      user_type_id: 'test1',
    };

    await usersRepositoryInMemory.create(newUser1);
    await usersRepositoryInMemory.create(newUser2);

    const users = await filterUserUseCase.execute({ name: 'User', user_type_id: 'test' });

    expect(users.length).toBe(2);
  });
});
