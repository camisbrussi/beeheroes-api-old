import { inject, injectable } from 'tsyringe';

import { Role } from '@modules/accounts/infra/typeorm/entities/Role';
import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository';

@injectable()
class FindRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) { }

  async execute(id: string): Promise<Role> {
    const roles = await this.rolesRepository.findById(id);

    return roles;
  }
}

export { FindRoleUseCase };
