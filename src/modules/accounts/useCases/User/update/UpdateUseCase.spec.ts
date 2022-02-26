import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../create/CreateUseCase';
import { UpdateUserUseCase } from './UpdateUseCase';

let createUserUseCase: CreateUserUseCase;
let updateUseCase: UpdateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Update Type User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    updateUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to edit a user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 'admin',
    });

    const userEdit = {
      id: user.id,
      name: 'Admin editado',
      email: 'editado@beeheroes.com',
    };

    await updateUseCase.execute(userEdit);

    const userEdited = await usersRepositoryInMemory.findByEmail(userEdit.email);

    expect(userEdited.name).toEqual(userEdit.name);
    expect(userEdited.email).toEqual(userEdit.email);
  });

  it('should be able to edit a user name', async () => {
    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 'admin',
    });

    const userEdit = {
      id: user.id,
      name: 'User name editado',
    };

    await updateUseCase.execute(userEdit);

    const userEdited = await usersRepositoryInMemory.findByEmail(user.email);

    expect(userEdited.name).toEqual(userEdit.name);
    expect(userEdited.email).toEqual(user.email);
  });

  it('should not be able to edit a user with exists email', async () => {
    await expect(async () => {
      const user = await createUserUseCase.execute({
        name: 'Admin',
        email: 'admin1@beeheroes.com',
        password: '123456',
        user_type_id: 'admin',
      });

      const userEdit = {
        id: user.id,
        email: 'admin1@beeheroes.com',
      };
      await updateUseCase.execute(userEdit);
    }).rejects.toEqual(new AppError('User already exists!'));
  });
});
