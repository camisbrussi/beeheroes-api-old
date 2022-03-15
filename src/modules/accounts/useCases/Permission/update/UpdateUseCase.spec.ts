import { PermissionRepositoryInMemory } from '@modules/accounts/repositories/in-memory/PermissionsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { UpdatePermissionUseCase } from './UpdateUseCase';

let updateTypeUseCase: UpdatePermissionUseCase;
let permissionsRepositoryInMemory: PermissionRepositoryInMemory;

describe('Update Type User', () => {
  beforeEach(() => {
    permissionsRepositoryInMemory = new PermissionRepositoryInMemory();
    updateTypeUseCase = new UpdatePermissionUseCase(permissionsRepositoryInMemory);
  });

  it('should be able to edit a permission name', async () => {
    const permission = await permissionsRepositoryInMemory.create({
      name: 'Permission name',
    });

    const permissionEdit = {
      id: permission.id,
      name: 'Permission name - edited',
    };

    await updateTypeUseCase.execute(permissionEdit);

    const permissionEdited = await permissionsRepositoryInMemory.findById(permission.id);

    expect(permissionEdited.name).toEqual(permissionEdit.name);
  });

  it('should not be able to edit a permission with exists name', async () => {
    await expect(async () => {
      const permission = await permissionsRepositoryInMemory.create({
        name: 'Permission name',
      });

      await permissionsRepositoryInMemory.create({
        name: 'Permission name2',
      });

      const permissionEdit = {
        id: permission.id,
        name: 'Permission name2',
      };
      await updateTypeUseCase.execute(permissionEdit);
    }).rejects.toEqual(new AppError('Permission already exists!'));
  });
});
