import { inject, injectable } from 'tsyringe';

import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository';

@injectable()
class DeleteRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private roleRepository: IRolesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // TODO poder excluir somente roles sem estar vinculadas com user

    await this.roleRepository.delete(id);
  }
}

export { DeleteRoleUseCase };
