import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  users_id: string[],
  organization_id: string,
}

@injectable()
class CreateOrganizationUserUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ users_id, organization_id }: IRequest): Promise<Organization> {
    const organizationExists = await this.organizationsRepository.findById(organization_id);

    if (!organizationExists.organization) {
      throw new AppError('Organization does not exist');
    }

    const userExists = await this.usersRepository.findByIds(users_id);

    if (!userExists) throw new AppError('User does not exists');

    organizationExists.organization.users = userExists;

    await this.organizationsRepository.create(organizationExists.organization);

    return organizationExists.organization;
  }
}

export { CreateOrganizationUserUseCase };
