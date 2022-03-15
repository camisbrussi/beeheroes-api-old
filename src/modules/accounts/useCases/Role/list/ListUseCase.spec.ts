import { RolesRepositoryInMemory } from '@modules/accounts/repositories/in-memory/RolesRepositoryInMemory';

import { ListRolesUseCase } from './LisUseCase';

let listRoleUseCase: ListRolesUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;

describe('List Roles', () => {
  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    listRoleUseCase = new ListRolesUseCase(rolesRepositoryInMemory);
  });

  it('should be abe to list all roles', async () => {
    const role = await rolesRepositoryInMemory.create({
      name: 'Role',
    });

    const roles = await listRoleUseCase.execute();

    expect(roles).toEqual([role]);
  });
});
