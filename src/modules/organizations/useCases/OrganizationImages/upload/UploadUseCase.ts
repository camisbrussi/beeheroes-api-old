import { inject, injectable } from 'tsyringe';

import { OrganizationImage } from '@modules/organizations/infra/typeorm/entities/OrganizationImages';
import { IOrganizationImagesRepository } from '@modules/organizations/repositories/IOrganizationImagesRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

export interface IRequestOrganizationImages {
  id?: string;
  images_name: string[];
  organization_id?: string;
}
@injectable()
class UploadOrganizationImageUseCase {
  constructor(
    @inject('OrganizationImagesRepository')
    private organizationImagesRepository: IOrganizationImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    images_name,
    organization_id,
  }: IRequestOrganizationImages): Promise<void> {
    const images = await this.organizationImagesRepository.findByOrganizationId(organization_id);

    if (images && images.length > 0) {
      images.map(async (image) => {
        await this.storageProvider.delete(image.image_name, 'avatar');
      });

      await this.organizationImagesRepository.deleteByIdOrOrganization(organization_id);
    }

    images_name?.map(async (image_name) => {
      await this.organizationImagesRepository.create(image_name, organization_id);
      await this.storageProvider.save(image_name, 'organization_images');
    });
  }
}

export { UploadOrganizationImageUseCase };
