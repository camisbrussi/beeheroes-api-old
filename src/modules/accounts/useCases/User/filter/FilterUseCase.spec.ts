import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { FilterUserUseCase } from './FilterUseCase';

let filterUserUseCase: FilterUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;

describe('List Users', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    filterUserUseCase = new FilterUserUseCase(usersRepositoryInMemory);
  });

  it('should be abe to filter user for name', async () => {
    const userType = await userTypesRepositoryInMemory.create({
      id: 1,
      name: 'UserType',
    });
    const newUser1: IUserDTO = {
      name: 'User',
      email: 'teste@beeheroes',
      password: 'test',
      user_type_id: 1,
    };

    const newUser2: IUserDTO = {
      name: 'User',
      email: 'teste2@beeheroes',
      password: 'test',
      user_type_id: userType.id,
    };

    await usersRepositoryInMemory.create(newUser1);
    await usersRepositoryInMemory.create(newUser2);

    const users = await filterUserUseCase.execute({ name: 'User' });

    expect(users.length).toBe(2);
  });

  it('should be abe to filter user for name and user type', async () => {
    await userTypesRepositoryInMemory.create({
      id: 2,
      name: 'UserType',
    });

    const newUser1: IUserDTO = {
      name: 'User',
      email: 'teste@beeheroes',
      password: 'test',
      user_type_id: 2,
    };

    const newUser2: IUserDTO = {
      name: 'User',
      email: 'teste2@beeheroes',
      password: 'test',
      user_type_id: 2,
    };

    await usersRepositoryInMemory.create(newUser1);
    await usersRepositoryInMemory.create(newUser2);

    const users = await filterUserUseCase.execute({ name: 'User', user_type_id: 1 });

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
