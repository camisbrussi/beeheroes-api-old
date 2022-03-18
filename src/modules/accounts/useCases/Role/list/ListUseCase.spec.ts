import { RolesRepositoryInMemory } from '@modules/accounts/repositories/in-memory/RolesRepositoryInMemory';

import { ListRoleUseCase } from './ListUseCase';

let listRoleUseCase: ListRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;

describe('List Role', () => {
  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    listRoleUseCase = new ListRoleUseCase(
      rolesRepositoryInMemory,
    );
  });

  it('should be abe to list all roles', async () => {
    const role = await rolesRepositoryInMemory.create({
      name: 'Role',
      description: 'Role Description',
    });

    const roles = await listRoleUseCase.execute();

    expect(roles).toEqual([role]);
  });
});
