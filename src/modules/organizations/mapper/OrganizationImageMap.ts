import { instanceToInstance } from 'class-transformer';

import { IOrganizationImageDTO } from '../dtos/IOrganizationImageDTO';
import { OrganizationImage } from '../infra/typeorm/entities/OrganizationImages';

class OrganizationMap {
  static toDTO({
    image_name,
    organization_id,
    image_url,
  }: OrganizationImage): IOrganizationImageDTO {
    const user = instanceToInstance({
      image_name,
      organization_id,
      image_url,
    });
    return user;
  }
}

export { OrganizationMap };
