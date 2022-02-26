import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListOrganizationsUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) { }

  async execute(): Promise<Organization[]> {
    const organization = await this.organizationsRepository.list();

    return organization;
  }
}

export { ListOrganizationsUseCase };
