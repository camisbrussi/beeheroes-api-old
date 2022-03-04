import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Address } from '@modules/address/infra/typeorm/entities/Address';
import { IAddressRepository } from '@modules/address/repositories/IAddressRepository';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  cnpj: string;
  description: string;
  organization_type_id: string;
  users?: User[];
  address?: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    cep: number,
    city_id: number,
  }
}

@injectable()
class CreateOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
    name,
    email,
    description,
    cnpj,
    organization_type_id,
    users,
    address,
  }: IRequest): Promise<Organization> {
    const organizationEmailAlreadyExists = await
    this.organizationsRepository.findByEmail(email);
    const organizationCnpjAlreadyExists = await
    this.organizationsRepository.findByCnpj(cnpj);

    if (organizationEmailAlreadyExists || organizationCnpjAlreadyExists) {
      throw new AppError('Organization already exists!');
    }

    let addressId: string;
    if (address) {
      const createdAddress = await this.addressRepository.create(address);
      addressId = createdAddress.id;
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      description,
      cnpj,
      organization_type_id,
      users,
      address_id: addressId,
    });

    return organization;
  }
}

export { CreateOrganizationUseCase };
