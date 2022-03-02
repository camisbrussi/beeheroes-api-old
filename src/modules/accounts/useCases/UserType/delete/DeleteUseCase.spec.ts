import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../../User/create/CreateUseCase';
import { CreateUserTypeUseCase } from '../create/CreateUseCase';
import { FindUserTypeUseCase } from '../find/FindUseCase';
import { DeleteUserTypeUseCase } from './DeleteUseCase';

let createUserTypeUseCase: CreateUserTypeUseCase;
let createUserUseCase: CreateUserUseCase;
let deleteTypeUseCase: DeleteUserTypeUseCase;
let findUserTypeUseCase: FindUserTypeUseCase;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Update Type user', () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserTypeUseCase = new CreateUserTypeUseCase(userTypesRepositoryInMemory);
    deleteTypeUseCase = new DeleteUserTypeUseCase(
      usersRepositoryInMemory,
      userTypesRepositoryInMemory,
    );
    findUserTypeUseCase = new FindUserTypeUseCase(userTypesRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to delete a user type', async () => {
    await createUserTypeUseCase.execute({
      id: 1,
      name: 'User Type name',
      description: 'User type description',
    });

    await deleteTypeUseCase.execute(1);
    const typeUser = await findUserTypeUseCase.execute(1);

    expect(typeUser).toBeUndefined();
  });

  it('should not be able to delete a user type in use', async () => {
    await createUserTypeUseCase.execute({
      id: 2,
      name: 'User Type name',
      description: 'User type description',
    });

    await createUserUseCase.execute({
      name: 'User Type name',
      email: 'teste@beeheroes.com',
      password: '123456',
      user_type_id: 2,
    });

    await expect(
      deleteTypeUseCase.execute(2),
    ).rejects.toEqual(new AppError("User type is in use and can't deleted!"));
  });
});
