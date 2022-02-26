import { OrganizationType } from '@modules/organizations/infra/typeorm/entities/OrganizationType';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { inject, injectable } from 'tsyringe';


@injectable()
class ListOrganizationTypesUseCase {
  constructor(
    @inject('OrganizationTypesRepository')
    private organizationTypesRepository: IOrganizationTypesRepository,
  ) { }

  async execute(): Promise<OrganizationType[]> {
    const organizationsTypes = await this.organizationTypesRepository.list();

    return organizationsTypes;
  }
}

export { ListOrganizationTypesUseCase };
