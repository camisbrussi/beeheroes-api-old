import { IPhoneDTO } from '@modules/addresses/dtos/IPhoneDTO';
import { Phone } from '@modules/addresses/infra/typeorm/entities/Phone';

import { IPhonesRepository } from '../IPhonesRepository';

class PhonesRepositoryInMemory implements IPhonesRepository {
  phones: Phone[] = [];

  async create({
    number,
    is_whatsapp,
    organization_id,
  }: IPhoneDTO): Promise<Phone> {
    const phones = new Phone();

    const CreatePhone = Object.assign(phones, {
      number,
      is_whatsapp,
      organization_id,
    });

    this.phones.push(CreatePhone);

    return phones;
  }

  async findById(id: string): Promise<Phone> {
    const phones = this.phones.find((phones) => phones.id === id);
    return phones;
  }

  async findByOrganizationId(organization_id: string): Promise<Phone[]> {
    const phones = this.phones
      .filter((phone) => organization_id.includes(phone.organization_id));
    return phones;
  }

  async deleteByIdOrOrganization(organization_id: string): Promise<void> {
    const phones = this.phones.find((ut) => ut.organization_id === organization_id);
    this.phones.splice(this.phones.indexOf(phones));
  }
}

export { PhonesRepositoryInMemory };
