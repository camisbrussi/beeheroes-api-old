import { inject, injectable } from 'tsyringe';

import { IOrganizationDTO } from '@modules/organizations/dtos/IOrganizationDTO';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { ItemListMap } from '@utils/mapper/ItemListMap';

@injectable()
class FilterOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) { }

  async execute({
    name,
    email,
    description,
    cnpj,
    status,
    organization_type_id,
  }: IOrganizationDTO): Promise<ItemListMap[]> {
    const organizations = await this.organizationsRepository.filter({
      name,
      email,
      description,
      cnpj,
      status,
      organization_type_id,
    });

    const listOrganizations = organizations
      .map((organization) => (ItemListMap.toDTO({
        id: organization.id,
        name: organization.name,
        image_url: `${process.env.APP_API_URL}/avatar/${organization.avatar}`,
        city: organization.address?.city?.name,
        uf: organization.address?.city?.state.uf,
      })));

    return listOrganizations;
  }
}

export { FilterOrganizationUseCase };
