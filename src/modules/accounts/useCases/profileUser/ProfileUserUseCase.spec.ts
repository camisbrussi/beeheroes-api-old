import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { ProfileUserUseCase } from './ProfileUserUseCase';

let profileUserUseCase: ProfileUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

beforeEach(() => {
  usersRepositoryInMemory = new UsersRepositoryInMemory();
  profileUserUseCase = new ProfileUserUseCase(
    usersRepositoryInMemory,
  );
});

describe('Profile User ', () => {
  it('should be able to find a profile', async () => {
    const user = await usersRepositoryInMemory.create({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      is_volunteer: false,
    });

    const profile = await profileUserUseCase.execute(user.id);

    expect(profile.email).toEqual('admin@beeheroes.com');
  });

  it('should not be able to create a new  with user nonexistent', async () => {
    await expect(
      profileUserUseCase.execute('user-nonexistent'),
    ).rejects.toEqual(new AppError('User does not exist'));
  });
});
