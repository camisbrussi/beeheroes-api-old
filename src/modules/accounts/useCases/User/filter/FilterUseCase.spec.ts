import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

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

    };

    const newUser2: IUserDTO = {
      name: 'User',
      email: 'teste2@beeheroes',
      password: 'test',
    };

    await usersRepositoryInMemory.create(newUser1);
    await usersRepositoryInMemory.create(newUser2);

    const users = await filterUserUseCase.execute({ name: 'User' });

    expect(users.length).toBe(2);
  });

  it('should not be able filter user nonexistent', async () => {
    await expect(
      filterUserUseCase.execute({
        name: 'Name User nonexistent',
      }),
    ).rejects.toEqual(new AppError('User does not exist'));
  });
});
