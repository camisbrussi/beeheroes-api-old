import { getRepository, Repository } from 'typeorm';

import { IAddressDTO } from '@modules/address/dtos/IAddressDTO';
import { IAddressRepository } from '@modules/address/repositories/IAddressRepository';

import { Address } from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private repository: Repository<Address>

  constructor() {
    this.repository = getRepository(Address);
  }

  async create({
    street,
    number,
    complement,
    district,
    cep,
    city_id,
  }: IAddressDTO): Promise<Address> {
    const address = this.repository.create({
      street,
      number,
      complement,
      district,
      cep,
      city_id,
    });
    await this.repository.save(address);

    return address;
  }

  async findById(id: string): Promise<Address> {
    const address = await this.repository.findOne({ id });
    return address;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { AddressRepository };
