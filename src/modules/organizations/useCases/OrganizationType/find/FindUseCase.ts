import { inject, injectable } from 'tsyringe';


import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { OrganizationType } from '@modules/organizations/infra/typeorm/entities/OrganizationType';


@injectable()
class FindOrganizationTypeUseCase {
  constructor(
    @inject('OrganizationTypesRepository')
    private organizationTypesRepository: IOrganizationTypesRepository,
  ) { }

  async execute(id: string): Promise<OrganizationType> {

    const organizationsType = await this.organizationTypesRepository.findById(id);

    return organizationsType;
  }
}

export { FindOrganizationTypeUseCase };
