import { inject, injectable } from 'tsyringe';

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IRequestAddress } from '@modules/addresses/useCases/address/create/CreateUseCase';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string,
  name?:string,
  description?:string;
  email?:string;
  cnpj?:string;
  organization_type_id?: string;
  status?: number;
  address_id?:string;
  address?: IRequestAddress;
}
@injectable()
class UpdateOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({
    id,
    name,
    email,
    description,
    cnpj,
    organization_type_id,
    status,
    address_id,
    address,
  }: IRequest): Promise<Organization> {
    const organizationEmailExist = await this.organizationsRepository.findByEmail(email);
    const organizationCnpjExist = await this.organizationsRepository.findByCnpj(cnpj);

    if (organizationEmailExist || organizationCnpjExist) {
      throw new AppError('Organization already exists!');
    }

    let addressId: string = null;

    if (address) {
      const createdAddress = await this.addressesRepository.create(address);
      addressId = createdAddress.id;
    }

    const organization = await this.organizationsRepository.update({
      id,
      name,
      email,
      description,
      cnpj,
      organization_type_id,
      status,
      address_id: addressId,
    });

    if (address && address_id) {
      await this.addressesRepository.delete(address_id);
    }
    return organization;
  }
}

export { UpdateOrganizationUseCase };
