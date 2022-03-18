import { PermissionsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/PermissionsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreatePermissionUseCase } from './CreateUseCase';

let permissionUserUseCase: CreatePermissionUseCase;
let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;

beforeEach(() => {
  permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
  permissionUserUseCase = new CreatePermissionUseCase(
    permissionsRepositoryInMemory,
  );
});

describe('Create User ', () => {
  it('should be able to create a new permission ', async () => {
    const permission = await permissionUserUseCase.execute({
      name: 'Admin',
    });

    const userCreated = await permissionsRepositoryInMemory.findById(permission.id);
    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to create a new permission with name exists', async () => {
    const permission = {
      name: 'Name test',
    };

    await permissionUserUseCase.execute(permission);

    await expect(
      permissionUserUseCase.execute(permission),
    ).rejects.toEqual(new AppError('Permission already exists!'));
  });
});
