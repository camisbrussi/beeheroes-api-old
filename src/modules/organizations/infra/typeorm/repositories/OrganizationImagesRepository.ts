import { getRepository, Repository } from 'typeorm';

import { IOrganizationImagesRepository } from '@modules/organizations/repositories/IOrganizationImagesRepository';

import { OrganizationImage } from '../entities/OrganizationImages';

class OrganizationImagesRepository implements IOrganizationImagesRepository {
  private repository: Repository<OrganizationImage>

  constructor() {
    this.repository = getRepository(OrganizationImage);
  }
  async create(image_name: string, organization_id: string): Promise<OrganizationImage> {
    const organizationImage = this.repository.create({
      image_name,
      organization_id,
    });
    await this.repository.save(organizationImage);

    return organizationImage;
  }

  async findById(id: string): Promise<OrganizationImage> {
    const organizationImage = await this.repository.findOne({ id });
    return organizationImage;
  }

  async findByOrganizationId(organization_id: string): Promise<OrganizationImage[]> {
    const organizationImages = await this.repository.find({ organization_id });

    return organizationImages;
  }

  async deleteByIdOrOrganization(organization_id: string): Promise<void> {
    await this.repository.delete({ organization_id });
  }
}

export { OrganizationImagesRepository };
