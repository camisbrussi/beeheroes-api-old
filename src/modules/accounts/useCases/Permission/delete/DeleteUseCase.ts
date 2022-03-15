import { inject, injectable } from 'tsyringe';

import { IPermissionsRepository } from '@modules/accounts/repositories/IPermissionsRepository';

@injectable()
class DeletePermissionUseCase {
  constructor(
    @inject('PermissionsRepository')
    private permissionRepository: IPermissionsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // TODO validar se possui usuários destinados naquela permissão

    await this.permissionRepository.delete(id);
  }
}

export { DeletePermissionUseCase };
