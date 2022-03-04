import { inject, injectable } from 'tsyringe';

import { Address } from '@modules/addresses/infra/typeorm/entities/Address';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';

export interface IRequestAddress {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  cep: number;
  city_id: number;
}

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private usersRepository: IAddressesRepository,
  ) {}

  async execute({
    street,
    number,
    complement,
    district,
    cep,
    city_id,
  }: IRequestAddress): Promise<Address> {
    const address = await this.usersRepository.create({
      street,
      number,
      complement,
      district,
      cep,
      city_id,
    });

    return address;
  }
}

export { CreateAddressUseCase };
