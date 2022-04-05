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
        name: data.organization.organizationType?.name,
        description: data.organization.organizationType?.description,
      },
      address: data.organization.address,
      images_url: images,
      phones: data.phones,
      projects: data.projects,
      donations: data.donations,
      responsibles,
    });
  }
}

export { FindOrganizationUseCase };
