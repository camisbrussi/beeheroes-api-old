import { OrganizationImage } from '../infra/typeorm/entities/OrganizationImages';

interface IOrganizationImagesRepository {
  create(image_name:string, organization_id:string,): Promise<OrganizationImage>;
  findByOrganizationId(organization_id: string): Promise<OrganizationImage[]>;
  deleteByIdOrOrganization(organization_id: string): Promise<void>;
}

export { IOrganizationImagesRepository };
