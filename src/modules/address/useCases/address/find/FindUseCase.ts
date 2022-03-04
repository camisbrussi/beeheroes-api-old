import { inject, injectable } from 'tsyringe';

import { Address } from '@modules/address/infra/typeorm/entities/Address';
import { IAddressRepository } from '@modules/address/repositories/IAddressRepository';

@injectable()
class FindAddressUseCase {
  constructor(
    @inject('AddressRepository')
    private userTypesRepository: IAddressRepository,
  ) { }

  async execute(id: string): Promise<Address> {
    const usersType = await this.userTypesRepository.findById(id);

    return usersType;
  }
}

export { FindAddressUseCase };
