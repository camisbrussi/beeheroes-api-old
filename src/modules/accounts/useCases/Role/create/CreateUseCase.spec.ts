import { RolesRepositoryInMemory } from '@modules/accounts/repositories/in-memory/RolesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateRoleUseCase } from './CreateUseCase';

let roleUserUseCase: CreateRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;

beforeEach(() => {
  rolesRepositoryInMemory = new RolesRepositoryInMemory();
  roleUserUseCase = new CreateRoleUseCase(
    rolesRepositoryInMemory,
  );
});

describe('Create Role ', () => {
  it('should be able to create a new role ', async () => {
    const role = await roleUserUseCase.execute({
      name: 'Admin',
    });

    const userCreated = await rolesRepositoryInMemory.findById(role.id);
    expect(userCreated).toHaveProperty('id');
  });

  it('should not be able to create a new role with name exists', async () => {
    const role = {
      name: 'Name test',
    };

    await roleUserUseCase.execute(role);

    await expect(
      roleUserUseCase.execute(role),
    ).rejects.toEqual(new AppError('Role already exists!'));
  });
});
