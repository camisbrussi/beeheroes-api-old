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

    const images = data.images?.map((image) => `${process.env.APP_API_URL}/organization_images/${image.image_name}`);

    const responsibles = data.organization.users?.map((user) => ({
      user_id: user.id,
      name: user.name,
      avatar: user.avatar,
    }));

    return OrganizationMap.toDTO({
      id: data.organization.id,
      status: data.organization.status,
      name: data.organization.name,
      description: data.organization.description,
      email: data.organization.email,
      cnpj: data.organization.cnpj,
      avatar: data.organization.avatar,
      organization_type: {
        id: data.organization.organizationType?.id,
        name: data.organization.organizationType?.name,
      },
      address: {
        id: data.organization.address?.id,
        street: data.organization.address?.street,
        number: data.organization.address?.number,
        complement: data.organization.address?.complement,
        district: data.organization.address?.district,
        cep: data.organization.address?.cep,
        city: {
          id: data.organization.address?.city?.id,
          name: data.organization.address?.city?.name,
          state: {
            id: data.organization.address?.city?.state?.id,
            name: data.organization.address?.city?.state?.name,
            uf: data.organization.address?.city?.state?.uf,
          },
        },
      },
      images_url: images,
      projects: data.projects,
      donations: data.donations,
      responsibles,
      phones: data.phones,
    });
  }
}

export { FindOrganizationUseCase };
