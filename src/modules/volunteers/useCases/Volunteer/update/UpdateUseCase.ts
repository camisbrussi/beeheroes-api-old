import { inject, injectable } from 'tsyringe';

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IRequestAddress } from '@modules/addresses/useCases/address/create/CreateUseCase';
import { Volunteer } from '@modules/volunteers/infra/typeorm/entities/Volunteer';
import { IVolunteersRepository } from '@modules/volunteers/repositories/IVolunteersRepository';

interface IRequest {
    id?: string;
    profession?: string;
    description?: string,
    occupation_area_id?: string,
    address_id?:string;
    address?: IRequestAddress;
}
@injectable()
class UpdateVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({
    id,
    profession,
    description,
    occupation_area_id,
    address_id,
    address,
  }: IRequest): Promise<Volunteer> {
    let addressId: string;
    if (address) {
      const createdAddress = await this.addressesRepository.create(address);
      addressId = createdAddress.id;
    }

    const volunteer = await this.volunteersRepository.update({
      id,
      profession,
      description,
      occupation_area_id,
      address_id: addressId,
    });

    if (address && address_id) {
      await this.addressesRepository.delete(address_id);
    }

    return volunteer;
  }
}

export { UpdateVolunteerUseCase };
