import { inject, injectable } from 'tsyringe';

import { Address } from '@modules/address/infra/typeorm/entities/Address';
import { IAddressRepository } from '@modules/address/repositories/IAddressRepository';

interface IRequest {
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
    @inject('AddressRepository')
    private usersRepository: IAddressRepository,
  ) {}

  async execute({
    street,
    number,
    complement,
    district,
    cep,
    city_id,
  }: IRequest): Promise<Address> {
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
