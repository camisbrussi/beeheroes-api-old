import { RolesRepositoryInMemory } from '@modules/accounts/repositories/in-memory/RolesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateRoleUseCase } from '../create/CreateUseCase';
import { UpdateRoleUseCase } from './UpdateUseCase';

let createRoleUseCase: CreateRoleUseCase;
let updateTypeUseCase: UpdateRoleUseCase;
let rolesRepositoryInMemory: RolesRepositoryInMemory;

describe('Update Role', () => {
  beforeEach(() => {
    rolesRepositoryInMemory = new RolesRepositoryInMemory();
    createRoleUseCase = new CreateRoleUseCase(rolesRepositoryInMemory);
    updateTypeUseCase = new UpdateRoleUseCase(rolesRepositoryInMemory);
  });

  it('should be able to edit a role', async () => {
    const role = await createRoleUseCase.execute({
      name: 'Role name',
      description: 'Role description',
    });

    const roleEdit = {
      id: role.id,
      name: 'Role name editado',
      description: 'Role description editado',
    };

    await updateTypeUseCase.execute(roleEdit);

    const roleEdited = await rolesRepositoryInMemory.findById(role.id);

    expect(roleEdited.name).toEqual(roleEdit.name);
    expect(roleEdited.description).toEqual(roleEdit.description);
  });

  it('should be able to edit a role name', async () => {
    const role = await createRoleUseCase.execute({
      name: 'Role name',
      description: 'Role description',
    });

    const roleEdit = {
      id: role.id,
      name: 'Role name editado',
    };

    await updateTypeUseCase.execute(roleEdit);

    const roleEdited = await rolesRepositoryInMemory.findByName(roleEdit.name);

    expect(roleEdited.name).toEqual(roleEdit.name);
    expect(roleEdited.description).toEqual(role.description);
  });

  it('should be able to edit a role description', async () => {
    const role = await createRoleUseCase.execute({
      name: 'Role name',
      description: 'Role description',
    });

    const roleEdit = {
      id: role.id,
      description: 'Role description - editado',
    };

    await updateTypeUseCase.execute(roleEdit);

    const roleEdited = await rolesRepositoryInMemory.findByName(role.name);

    expect(roleEdited.name).toEqual(role.name);
    expect(roleEdited.description).toEqual(roleEdit.description);
  });

  it('should not be able to edit a role with exists name', async () => {
    await expect(async () => {
      await createRoleUseCase.execute({
        name: 'Role name',
        description: 'Role description',
      });

      const role = await createRoleUseCase.execute({
        name: 'Role name2',
      });

      const roleEdit = {
        id: role.id,
        name: 'Role name',
        description: 'Role name2',
      };
      await updateTypeUseCase.execute(roleEdit);
    }).rejects.toEqual(new AppError('Role already exists!'));
  });
});
