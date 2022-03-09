import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { FindUserUseCase } from './FindUseCase';

let findUserUseCase: FindUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;

describe('List Users', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    findUserUseCase = new FindUserUseCase(usersRepositoryInMemory);
  });

  it('should be abe to find user', async () => {
    const userType = await userTypesRepositoryInMemory.create({
      name: 'UserType',
    });

    const newUser = {
      name: 'User',
      email: 'teste@beeheroes',
      password: 'test',
      user_type_id: userType.id,
    };

    const { id } = await usersRepositoryInMemory.create(newUser);

    const user = await findUserUseCase.execute(id);

    expect(user.id).toEqual(id);
  });

  it('should not be able filter user nonexistent', async () => {
    await expect(
      findUserUseCase.execute('123'),
    ).rejects.toEqual(new AppError('User does not exist'));
  });
});
