import { inject, injectable } from 'tsyringe';

import { Role } from '@modules/accounts/infra/typeorm/entities/Role';
import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string,
  name?:string,
  description?:string;
}
@injectable()
class UpdateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private roleRepository: IRolesRepository,
  ) {}

  async execute({ id, name, description }: IRequest): Promise<Role> {
    const roleExist = await this.roleRepository.findByName(name);

    if (roleExist) {
      throw new AppError('Role already exists!');
    }

    const role = await this.roleRepository.update({
      id,
      name,
      description,
    });

    return role;
  }
}

export { UpdateRoleUseCase };
