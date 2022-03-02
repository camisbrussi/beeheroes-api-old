import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { FindUserUseCase } from '../../User/find/FindUseCase';

let findUsersUseCase: FindUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('List Users ', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    findUsersUseCase = new FindUserUseCase(usersRepositoryInMemory);
  });

  it('should be abe to find user for id', async () => {
    const user = {
      name: 'User',
      email: 'admin@beeheroes.com',
      password: '123',
      user_type_id: 1,
    };

    const { id } = await usersRepositoryInMemory.create(user);

    const users = await findUsersUseCase.execute(id);

    expect(users.id).toEqual(id);
  });
});
