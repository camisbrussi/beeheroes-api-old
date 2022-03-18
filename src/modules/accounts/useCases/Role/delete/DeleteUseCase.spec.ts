import { RolesRepositoryInMemory } from '@modules/accounts/repositories/in-memory/RolesRepositoryInMemory';

import { CreateRoleUseCase } from '../create/CreateUseCase';
import { FindRoleUseCase } from '../find/FindUseCase';
import { DeleteRoleUseCase } from './DeleteUseCase';

let createRolesUseCase: CreateRoleUseCase;
let deleteRolesUseCase: DeleteRoleUseCase;
let findRoleUseCase: FindRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;

describe('Update Role', () => {
  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    deleteRolesUseCase = new DeleteRoleUseCase(
      rolesRepositoryInMemory,
    );
    createRolesUseCase = new CreateRoleUseCase(
      rolesRepositoryInMemory,
    );
    findRoleUseCase = new FindRoleUseCase(
      rolesRepositoryInMemory,
    );
  });

  it('should be able to delete a roles', async () => {
    const roles = await createRolesUseCase.execute({
      name: 'Organization Type name',
    });

    await deleteRolesUseCase.execute(roles.id);
    const roleDeleted = await findRoleUseCase.execute(roles.id);

    expect(roleDeleted).toBeUndefined();
  });
});
