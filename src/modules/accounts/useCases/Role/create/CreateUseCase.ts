import { inject, injectable } from 'tsyringe';

import { Role } from '@modules/accounts/infra/typeorm/entities/Role';
import { IRolesRepository } from '@modules/accounts/repositories/IRolesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest{
  id?: string,
  name: string,
  description?: string,
}

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private roleRepository: IRolesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Role> {
    const roleExist = await this.roleRepository.findByName(name);

    if (roleExist) {
      throw new AppError('Role already exists!');
    }

    const role = await this.roleRepository.create({
      name,
      description,
    });

    return role;
  }
}

export { CreateRoleUseCase };
