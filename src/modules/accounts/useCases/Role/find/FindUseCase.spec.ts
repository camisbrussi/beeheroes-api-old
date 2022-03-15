import { RolesRepositoryInMemory } from '@modules/accounts/repositories/in-memory/RolesRepositoryInMemory';

import { FindRoleUseCase } from './FindUseCase';

let findRoleUseCase: FindRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;

describe('List Roles ', () => {
  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    findRoleUseCase = new FindRoleUseCase(rolesRepositoryInMemory);
  });

  it('should be abe to find role for id', async () => {
    const role = {
      name: 'Role',
    };

    const { id } = await rolesRepositoryInMemory.create(role);

    const roles = await findRoleUseCase.execute(id);

    expect(roles.id).toEqual(id);
  });
});
