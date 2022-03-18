import { PermissionsRepositoryInMemory } from '@modules/accounts/repositories/in-memory/PermissionsRepositoryInMemory';

import { ListPermissionUseCase } from './LisUseCase';

let listPermissionUseCase: ListPermissionUseCase;
let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;

describe('List Permission', () => {
  beforeEach(() => {
    permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
    listPermissionUseCase = new ListPermissionUseCase(
      permissionsRepositoryInMemory,
    );
  });

  it('should be abe to list all permissions', async () => {
    const permission = await permissionsRepositoryInMemory.create({
      name: 'Permission',
      description: 'Permission Description',
    });

    const permissions = await listPermissionUseCase.execute();

    expect(permissions).toEqual([permission]);
  });
});
