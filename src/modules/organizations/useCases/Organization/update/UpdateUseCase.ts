import { inject, injectable } from 'tsyringe';

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IPhonesRepository } from '@modules/addresses/repositories/IPhonesRepository';
import { IRequestAddress } from '@modules/addresses/useCases/address/create/CreateUseCase';
import { IRequestPhones } from '@modules/addresses/useCases/phones/create/CreateUseCase';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string,
  name?:string,
  description?:string;
  email?:string;
  cnpj?:string;
  organization_type_id?: number;
  status?: number;
  address_id?:string;
  address?: IRequestAddress;
  phones?: IRequestPhones[];
}
@injectable()
class UpdateOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
     @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
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
    phones,
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

    if (phones) {
      await this.phonesRepository.deleteByIdOrOrganization(organization.id);
    }

    if (phones && phones.length > 0) {
      phones.map(async (phone) => {
        await this.phonesRepository.create({
          number: phone.number,
          is_whatsapp: phone.is_whatsapp,
          organization_id: id,
        });
      });
    }

    return organization;
  }
}

export { UpdateOrganizationUseCase };
