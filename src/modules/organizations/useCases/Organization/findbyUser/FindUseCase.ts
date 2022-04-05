import { inject, injectable } from 'tsyringe';

import { OrganizationMap } from '@modules/organizations/mapper/OrganizationMap';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindOrganizationUserUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) { }

  async execute(id: string): Promise<OrganizationMap> {
    const organization = await this.organizationsRepository.findByUser(id);

    if (!organization) {
      throw new AppError('Organization does not exist');
    }

    return OrganizationMap.toDTO({
      id: organization.id,
      status: organization.status,
      name: organization.name,
      description: organization.description,
      email: organization.email,
      cnpj: organization.cnpj,
      avatar: organization.avatar,
      organization_type: {
        name: organization.organizationType?.name,
        description: organization.organizationType?.description,
      },
      address: {
        street: organization.address?.street,
        number: organization.address?.number,
        complement: organization.address?.complement,
        district: organization.address?.district,
        cep: organization.address?.cep,
        city: organization.address?.city?.name,
        uf: organization.address?.city?.state?.uf,
      },
    });
  }
}

export { FindOrganizationUserUseCase };
