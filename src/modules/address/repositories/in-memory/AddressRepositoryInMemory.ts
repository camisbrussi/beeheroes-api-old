import { IAddressDTO } from '@modules/address/dtos/IAddressDTO';
import { Address } from '@modules/address/infra/typeorm/entities/Address';

import { IAddressRepository } from '../IAddressRepository';

class AddressRepositoryInMemory implements IAddressRepository {
  address: Address[] = [];

  async create({
    street,
    number,
    complement,
    district,
    cep,
  }: IAddressDTO): Promise<Address> {
    const address = new Address();

    const CreateAddress = Object.assign(address, {
      street,
      number,
      complement,
      district,
      cep,
    });

    this.address.push(CreateAddress);

    return address;
  }

  async findById(id: string): Promise<Address> {
    const address = this.address.find((address) => address.id === id);
    return address;
  }

  async delete(id: string): Promise<void> {
    const address = this.address.find((ut) => ut.id === id);
    this.address.splice(this.address.indexOf(address));
  }
}

export { AddressRepositoryInMemory };
