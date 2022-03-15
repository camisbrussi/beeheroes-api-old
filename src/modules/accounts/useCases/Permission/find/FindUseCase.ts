import { inject, injectable } from 'tsyringe';

import { Permission } from '@modules/accounts/infra/typeorm/entities/Permission';
import { IPermissionsRepository } from '@modules/accounts/repositories/IPermissionsRepository';

@injectable()
class FindPermissionUseCase {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) { }

  async execute(id: string): Promise<Permission> {
    const permission = await this.permissionsRepository.findById(id);

    return permission;
  }
}

export { FindPermissionUseCase };
