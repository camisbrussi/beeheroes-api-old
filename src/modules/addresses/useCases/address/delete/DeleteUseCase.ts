import { inject, injectable } from 'tsyringe';

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressRepository: IAddressesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }
}

export { DeleteAddressUseCase };
