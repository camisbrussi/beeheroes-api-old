import { inject, injectable } from 'tsyringe';

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IRequestAddress } from '@modules/addresses/useCases/address/create/CreateUseCase';
import { Volunteer } from '@modules/volunteers/infra/typeorm/entities/Volunteer';
import { IVolunteersRepository } from '@modules/volunteers/repositories/IVolunteersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    id?: string;
    cpf: string;
    profession: string;
    description?: string,
    occupation_area_id: string,
    user_id: string,
  address?: IRequestAddress;

}

@injectable()
class CreateVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
    @inject('AddressesRepository')
    private addressRepository: IAddressesRepository,
  ) {}

  async execute({
    id,
    cpf,
    profession,
    description,
    occupation_area_id,
    user_id,
    address,

  }: IRequest): Promise<Volunteer> {
    const volunteerAlreadyExists = await this.volunteersRepository.findByCpf(cpf);

    if (volunteerAlreadyExists) {
      throw new AppError('Volunteer already exists');
    }

    let addressId: string;
    if (address) {
      const createdAddress = await this.addressRepository.create(address);
      addressId = createdAddress.id;
    }

    const volunteer = await this.volunteersRepository.create({
      id,
      cpf,
      profession,
      description,
      occupation_area_id,
      user_id,
      address_id: addressId,
    });

    return volunteer;
  }
}

export { CreateVolunteerUseCase };
