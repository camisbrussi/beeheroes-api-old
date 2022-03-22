import { inject, injectable } from 'tsyringe';

import { OrganizationMap } from '@modules/organizations/mapper/OrganizationMap';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) { }

  async execute(id: string): Promise<OrganizationMap> {
    const data = await this.organizationsRepository.findById(id);

    if (!data.organization) {
      throw new AppError('Organization does not exist');
    }

    const images = data.images?.map((image) => `${process.env.APP_API_URL}/avatar/${image.image_name}`);

    return OrganizationMap.toDTO({
      id: data.organization.id,
      status: data.organization.status,
      name: data.organization.name,
      description: data.organization.description,
      email: data.organization.email,
      cnpj: data.organization.cnpj,
      avatar_url: data.organization.avatar ? `${process.env.APP_API_URL}/avatar/${data.organization.avatar}` : null,
      organization_type: {
        name: data.organization.organizationType?.name,
        description: data.organization.organizationType?.description,
      },
      address: {
        street: data.organization.address?.street,
        number: data.organization.address?.number,
        complement: data.organization.address?.complement,
        district: data.organization.address?.district,
        cep: data.organization.address?.cep,
        city: data.organization.address?.city?.name,
        uf: data.organization.address?.city?.state?.uf,
      },
      images_url: images,
      phones: data.phones,
    });
  }
}

export { FindOrganizationUseCase };
