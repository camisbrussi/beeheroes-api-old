import { getRepository, Repository } from 'typeorm';

import { IPhoneDTO } from '@modules/addresses/dtos/IPhoneDTO';
import { IPhonesRepository } from '@modules/addresses/repositories/IPhonesRepository';

import { Phone } from '../entities/Phone';

class PhonesRepository implements IPhonesRepository {
  private repository: Repository<Phone>

  constructor() {
    this.repository = getRepository(Phone);
  }
  async create({
    id,
    number,
    is_whatsapp,
    organization_id,
  }: IPhoneDTO): Promise<Phone> {
    const phone = this.repository.create({
      id,
      number,
      is_whatsapp,
      organization_id,
    });
    await this.repository.save(phone);

    return phone;
  }

  async findById(id: string): Promise<Phone> {
    const phone = await this.repository.findOne({ id });
    return phone;
  }

  async findByOrganizationId(organization_id: string): Promise<Phone[]> {
    const phones = await this.repository.find({ organization_id });

    return phones;
  }

  async deleteByIdOrOrganization(organization_id: string): Promise<void> {
    await this.repository.delete({ organization_id });
  }
}

export { PhonesRepository };
