import { PermissionsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/PermissionsRepositoryInMemory';

import { CreatePermissionUseCase } from '../create/CreateUseCase';
import { FindPermissionUseCase } from '../find/FindUseCase';
import { DeletePermissionUseCase } from './DeleteUseCase';

let createPermissionsUseCase: CreatePermissionUseCase;
let deletePermissionsUseCase: DeletePermissionUseCase;
let findPermissionUseCase: FindPermissionUseCase;
let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;

describe('Update Permission', () => {
  beforeEach(() => {
    permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
    deletePermissionsUseCase = new DeletePermissionUseCase(
      permissionsRepositoryInMemory,
    );
    createPermissionsUseCase = new CreatePermissionUseCase(
      permissionsRepositoryInMemory,
    );
    findPermissionUseCase = new FindPermissionUseCase(
      permissionsRepositoryInMemory,
    );
  });

  it('should be able to delete a permissions', async () => {
    const permissions = await createPermissionsUseCase.execute({
      name: 'Organization Type name',
    });

    await deletePermissionsUseCase.execute(permissions.id);
    const permissionDeleted = await findPermissionUseCase.execute(permissions.id);

    expect(permissionDeleted).toBeUndefined();
  });
});
