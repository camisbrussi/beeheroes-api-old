import { IOrganizationImageDTO } from '@modules/organizations/dtos/IOrganizationImageDTO';
import { OrganizationImage } from '@modules/organizations/infra/typeorm/entities/OrganizationImages';

import { IOrganizationImagesRepository } from '../IOrganizationImagesRepository';

class OrganizationImagesRepositoryInMemory implements IOrganizationImagesRepository {
  organizationImages: OrganizationImage[] = [];

  async create(images_name: string, organization_id:string): Promise<OrganizationImage> {
    const organizationImages = new OrganizationImage();

    const CreateOrganizationImage = Object.assign(organizationImages, {
      images_name,
      organization_id,
    });

    this.organizationImages.push(CreateOrganizationImage);

    return organizationImages;
  }

  async findById(id: string): Promise<OrganizationImage> {
    const organizationImages = this.organizationImages
      .find((organizationImages) => organizationImages.id === id);
    return organizationImages;
  }

  async findByOrganizationId(organization_id: string): Promise<OrganizationImage[]> {
    const organizationImages = this.organizationImages
      .filter((organizationImage) => organization_id.includes(organizationImage.organization_id));
    return organizationImages;
  }

  async deleteByIdOrOrganization(organization_id: string): Promise<void> {
    const organizationImages = this.organizationImages
      .find((ut) => ut.organization_id === organization_id);
    this.organizationImages.splice(this.organizationImages.indexOf(organizationImages));
  }
}

export { OrganizationImagesRepositoryInMemory };
