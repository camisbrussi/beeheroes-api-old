import { inject, injectable } from 'tsyringe';

import { Role } from '@modules/accounts/infra/typeorm/entities/Role';
import { IPermissionsRepository } from '@modules/accounts/repositories/IPermissionsRepository';
import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  permissions_id: string[],
  role_id: string,
}

@injectable()
class CreateRolePermissionUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute({ permissions_id, role_id }: IRequest): Promise<Role> {
    const roleExists = await this.rolesRepository.findById(role_id);

    if (!roleExists) {
      throw new AppError('Role does not exist');
    }

    const permissionExists = await this.permissionsRepository.findByIds(permissions_id);

    if (!permissionExists) throw new AppError('User does not exists');

    roleExists.permissions = permissionExists;

    await this.rolesRepository.create(roleExists);

    return roleExists;
  }
}

export { CreateRolePermissionUseCase };
