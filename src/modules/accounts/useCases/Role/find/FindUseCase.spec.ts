import { RolesRepositoryInMemory } from '@modules/accounts/repositories/in-memory/RolesRepositoryInMemory';

import { FindRoleUseCase } from './FindUseCase';

let findRolesUseCase: FindRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;

describe('List Roles ', () => {
  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    findRolesUseCase = new FindRoleUseCase(rolesRepositoryInMemory);
  });

  it('should be abe to find role for id', async () => {
    const role = {
      name: 'Role',
    };

    const { id } = await rolesRepositoryInMemory.create(role);

    const roles = await findRolesUseCase.execute(id);

    expect(roles.id).toEqual(id);
  });
});
