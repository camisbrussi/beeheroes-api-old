import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { IPhonesRepository } from '@modules/addresses/repositories/IPhonesRepository';
import { IRequestAddress } from '@modules/addresses/useCases/address/create/CreateUseCase';
import { IRequestPhones } from '@modules/addresses/useCases/phones/create/CreateUseCase';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { AppError } from '@shared/errors/AppError';

type UserRequest = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  is_volunteer: boolean;
}

type OrganizationRequest = {
  name: string;
  email: string;
  cnpj: string;
  description: string;
  organization_type_id: string;
  users?: User[];
  address?: IRequestAddress;
  phones?: IRequestPhones[]
  avatar?: string,
}

interface IRequest {
  user: UserRequest;
  organization: OrganizationRequest;
}

@injectable()
class CreateUserAndOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
    @inject('PhonesRepository')
    private phonesRepository: IPhonesRepository,
    @inject('OrganizationTypesRepository')
    private organizationTypeRepository: IOrganizationTypesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user,
    organization,
  }: IRequest): Promise<Organization> {
    const organizationEmailAlreadyExists = await
    this.organizationsRepository.findByEmail(organization.email);
    const organizationCnpjAlreadyExists = await
    this.organizationsRepository.findByCnpj(organization.cnpj);
    const organizationTypeExist = await
    this.organizationTypeRepository.findById(organization.organization_type_id);
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email);

    if (organizationEmailAlreadyExists || organizationCnpjAlreadyExists) {
      throw new AppError('Organization already exists!');
    }

    if (!organizationTypeExist) {
      throw new AppError('Organization type does not exist!');
    }

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    let addressId: string;
    if (organization.address) {
      const createdAddress = await this.addressesRepository.create(organization.address);
      addressId = createdAddress.id;
    }

    const newUser = await this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      is_volunteer: false,
    });

    const newOrganization = await this.organizationsRepository.create({
      name: organization.name,
      email: organization.email,
      description: organization.description,
      cnpj: organization.cnpj,
      organization_type_id: organization.organization_type_id,
      users: [newUser],
      address_id: addressId,
      avatar: organization.avatar,
    });

    if (organization.phones && organization.phones.length > 0) {
      organization.phones.map(async (phone) => {
        await this.phonesRepository.create({
          number: phone.number,
          is_whatsapp: phone.is_whatsapp,
          organization_id: newOrganization.id,
        });
      });
    }

    return newOrganization;
  }
}

export { CreateUserAndOrganizationUseCase };
