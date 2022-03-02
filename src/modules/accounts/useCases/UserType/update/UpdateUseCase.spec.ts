import { UserTypeRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserTypesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserTypeUseCase } from '../create/CreateUseCase';
import { UpdateUserTypeUseCase } from './UpdateUseCase';

let createUserTypeUseCase: CreateUserTypeUseCase;
let updateTypeUseCase: UpdateUserTypeUseCase;
let userTypesRepositoryInMemory: UserTypeRepositoryInMemory;

describe('Update Type User', () => {
  beforeEach(() => {
    userTypesRepositoryInMemory = new UserTypeRepositoryInMemory();
    createUserTypeUseCase = new CreateUserTypeUseCase(userTypesRepositoryInMemory);
    updateTypeUseCase = new UpdateUserTypeUseCase(userTypesRepositoryInMemory);
  });

  it('should be able to edit a user type', async () => {
    await createUserTypeUseCase.execute({
      id: 1,
      name: 'User Type name',
      description: 'User type description',
    });

    const userTypeEdit = {
      id: 1,
      name: 'User Type name editado',
      description: 'User type description editado',
    };

    await updateTypeUseCase.execute(userTypeEdit);

    const userTypeEdited = await userTypesRepositoryInMemory.findById(1);

    expect(userTypeEdited.name).toEqual(userTypeEdit.name);
    expect(userTypeEdited.description).toEqual(userTypeEdit.description);
  });

  it('should be able to edit a user type name', async () => {
    const userType = await createUserTypeUseCase.execute({
      id: 2,
      name: 'User Type name',
      description: 'User type description',
    });

    const userTypeEdit = {
      id: 2,
      name: 'User Type name editado',
    };

    await updateTypeUseCase.execute(userTypeEdit);

    const userTypeEdited = await userTypesRepositoryInMemory.findByName(userTypeEdit.name);

    expect(userTypeEdited.name).toEqual(userTypeEdit.name);
    expect(userTypeEdited.description).toEqual(userType.description);
  });

  it('should be able to edit a user type description', async () => {
    const userType = await createUserTypeUseCase.execute({
      id: 3,
      name: 'User Type name',
      description: 'User type description',
    });

    const userTypeEdit = {
      id: 3,
      description: 'User type description - editado',
    };

    await updateTypeUseCase.execute(userTypeEdit);

    const userTypeEdited = await userTypesRepositoryInMemory.findByName(userType.name);

    expect(userTypeEdited.name).toEqual(userType.name);
    expect(userTypeEdited.description).toEqual(userTypeEdit.description);
  });

  it('should not be able to edit a user type with exists name', async () => {
    await expect(async () => {
      await createUserTypeUseCase.execute({
        id: 4,
        name: 'User Type name',
        description: 'User type description',
      });

      await createUserTypeUseCase.execute({
        id: 5,
        name: 'User Type name2',
      });

      const userTypeEdit = {
        id: 5,
        name: 'User Type name',
        description: 'User Type name2',
      };
      await updateTypeUseCase.execute(userTypeEdit);
    }).rejects.toEqual(new AppError('User type already exists!'));
  });
});
