import { inject, injectable } from 'tsyringe';

import { IOrganizationImageDTO } from '@modules/organizations/dtos/IOrganizationImageDTO';
import { OrganizationMap } from '@modules/organizations/mapper/OrganizationImageMap';
import { IOrganizationImagesRepository } from '@modules/organizations/repositories/IOrganizationImagesRepository';

export interface IRequest {
  organization_id?: string;
}
@injectable()
class FindOrganizationImagesUseCase {
  constructor(
    @inject('OrganizationImagesRepository')
    private organizationImagesRepository: IOrganizationImagesRepository,
  ) {}

  async execute({
    organization_id,
  }: IRequest): Promise<IOrganizationImageDTO[]> {
    const images = await this.organizationImagesRepository.findByOrganizationId(organization_id);
    const organizationImages: IOrganizationImageDTO[] = [];

    images?.map(async (image) => {
      organizationImages.push(OrganizationMap.toDTO(image));
    });

    return organizationImages;
  }
}

export { FindOrganizationImagesUseCase };
