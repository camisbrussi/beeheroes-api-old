import { RolesRepositoryInMemory } from '@modules/accounts/repositories/in-memory/RolesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateRoleUseCase } from './CreateUseCase';

let createRoleUseCase: CreateRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;

describe('Create Roles', () => {
  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    createRoleUseCase = new CreateRoleUseCase(rolesRepositoryInMemory);
  });
  it('should be able to create a new role', async () => {
    const role = {
      name: 'Roles name',
      description: 'Role description',
    };

    await createRoleUseCase.execute(role);

    const roleCreated = await rolesRepositoryInMemory.findByName(role.name);

    expect(roleCreated).toHaveProperty('id');
  });

  it('should not be able to create a role if exists name', async () => {
    await expect(async () => {
      await createRoleUseCase.execute({
        name: 'Roles',
        description: 'Role description',
      });

      await createRoleUseCase.execute({
        name: 'Roles',
        description: 'Role description',
      });
    }).rejects.toEqual(new AppError('Role already exists!'));
  });
});
