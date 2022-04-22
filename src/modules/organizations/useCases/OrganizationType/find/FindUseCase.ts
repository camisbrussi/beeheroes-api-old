import { inject, injectable } from 'tsyringe';

import { OrganizationType } from '@modules/organizations/infra/typeorm/entities/OrganizationType';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';

@injectable()
class FindOrganizationTypeUseCase {
  constructor(
    @inject('OrganizationTypesRepository')
    private organizationTypesRepository: IOrganizationTypesRepository,
  ) { }

  async execute(id: number): Promise<OrganizationType> {
    const organizationsType = await this.organizationTypesRepository.findById(id);

    return organizationsType;
  }
}

export { FindOrganizationTypeUseCase };
