import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../create/CreateUseCase';
import { UpdateUserUseCase } from './UpdateUseCase';

let createUserUseCase: CreateUserUseCase;
let updateUseCase: UpdateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;

describe('Update Type User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      userTypesRepositoryInMemory,
    );
    updateUseCase = new UpdateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to edit a user', async () => {
    await userTypesRepositoryInMemory.create({
      id: 1,
      name: 'UserType',
    });

    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 1,
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
    await userTypesRepositoryInMemory.create({
      id: 2,
      name: 'UserType',
    });

    const user = await createUserUseCase.execute({
      name: 'Admin',
      email: 'admin@beeheroes.com',
      password: '123456',
      user_type_id: 2,
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
      await userTypesRepositoryInMemory.create({
        id: 3,
        name: 'UserType',
      });
      const user = await createUserUseCase.execute({
        name: 'Admin',
        email: 'admin1@beeheroes.com',
        password: '123456',
        user_type_id: 3,
      });

      const userEdit = {
        id: user.id,
        email: 'admin1@beeheroes.com',
      };
      await updateUseCase.execute(userEdit);
    }).rejects.toEqual(new AppError('User already exists!'));
  });
});
