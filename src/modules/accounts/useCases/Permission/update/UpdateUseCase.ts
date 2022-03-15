import { inject, injectable } from 'tsyringe';

import { Permission } from '@modules/accounts/infra/typeorm/entities/Permission';
import { IPermissionsRepository } from '@modules/accounts/repositories/IPermissionsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string,
  name?:string,
  description?:string;
}
@injectable()
class UpdatePermissionUseCase {
  constructor(
    @inject('PermissionsRepository')
    private permissionRepository: IPermissionsRepository,
  ) {}

  async execute({ id, name, description }: IRequest): Promise<Permission> {
    const permissionExist = await this.permissionRepository.findByName(name);

    if (permissionExist) {
      throw new AppError('Permission already exists!');
    }

    const permission = await this.permissionRepository.update({
      id,
      name,
      description,
    });

    return permission;
  }
}

export { UpdatePermissionUseCase };
