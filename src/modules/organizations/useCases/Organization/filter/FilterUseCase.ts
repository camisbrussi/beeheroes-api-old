import { inject, injectable } from 'tsyringe';

import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { ItemListMap } from '@utils/mapper/ItemListMap';

interface IRequest {
  name?: string;
  status?: number;
  organization_type_id?: number;
  state_id?: number,
  city_id?: number;
}

@injectable()
class FilterOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) { }

  async execute({
    name,
    status,
    city_id,
    organization_type_id,
    state_id,
  }: IRequest): Promise<ItemListMap[]> {
    const organizations = await this.organizationsRepository.filter({
      name,
      status,
      city_id,
      organization_type_id,
      state_id,
    });

    const listOrganizations = organizations
      .map((organization) => (ItemListMap.toDTO({
        id: organization.id,
        name: organization.name,
        avatar: organization.avatar,
        city: organization.address?.city?.name,
        uf: organization.address?.city?.state.uf,
      })));

    return listOrganizations;
  }
}

export { FilterOrganizationUseCase };
