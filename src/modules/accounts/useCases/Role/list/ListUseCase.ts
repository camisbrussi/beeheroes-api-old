import { inject, injectable } from 'tsyringe';

import { Role } from '@modules/accounts/infra/typeorm/entities/Role';
import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository';

@injectable()
class ListRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) { }

  async execute(): Promise<Role[]> {
    const roles = await this.rolesRepository.list();

    return roles;
  }
}

export { ListRoleUseCase };
