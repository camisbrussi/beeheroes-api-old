import { PermissionsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/PermissionsRepositoryInMemory';

import { FindPermissionUseCase } from './FindUseCase';

let findPermissionsUseCase: FindPermissionUseCase;
let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;

describe('List Permissions ', () => {
  beforeEach(() => {
    permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
    findPermissionsUseCase = new FindPermissionUseCase(permissionsRepositoryInMemory);
  });

  it('should be abe to find permission for id', async () => {
    const permission = {
      name: 'Permission',
    };

    const { id } = await permissionsRepositoryInMemory.create(permission);

    const permissions = await findPermissionsUseCase.execute(id);

    expect(permissions.id).toEqual(id);
  });
});
