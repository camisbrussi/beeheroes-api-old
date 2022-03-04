import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IPhonesRepository } from '@modules/addresses/repositories/IPhonesRepository';
import { IRequestAddress } from '@modules/addresses/useCases/address/create/CreateUseCase';
import { IRequestPhones } from '@modules/addresses/useCases/phones/create/CreateUseCase';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  cnpj: string;
  description: string;
  organization_type_id: string;
  users?: User[];
  address?: IRequestAddress;
  phones?: IRequestPhones[]
}

@injectable()
class CreateOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
  ) {}

  async execute({
    name,
    email,
    description,
    cnpj,
    organization_type_id,
    users,
    address,
    phones,
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
      const createdAddress = await this.addressesRepository.create(address);
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

    if (phones && phones.length > 0) {
      phones.map(async (phone) => {
        await this.phonesRepository.create({
          number: phone.number,
          is_whatsapp: phone.is_whatsapp,
          organization_id: organization.id,
        });
      });
    }

    return organization;
  }
}

export { CreateOrganizationUseCase };
