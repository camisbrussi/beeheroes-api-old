import { IPhoneDTO } from '../dtos/IPhoneDTO';
import { Phone } from '../infra/typeorm/entities/Phone';

interface IPhonesRepository {
  create({
    number,
    is_whatsapp,
    organization_id,
  }: IPhoneDTO): Promise<Phone>;
  findById(id: string): Promise<Phone>;
  findByOrganizationId(organization_id: string): Promise<Phone[]>;
  deleteByIdOrOrganization(organization_id: string): Promise<void>;
}

export { IPhonesRepository };
