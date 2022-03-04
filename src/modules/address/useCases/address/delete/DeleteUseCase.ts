import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '@modules/address/repositories/IAddressRepository';

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }
}

export { DeleteAddressUseCase };
