import { hash } from 'bcrypt';
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
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('OrganizationTypesRepository')
    private organizationTypeRepository: IOrganizationTypesRepository,
  ) {}

  async execute({
    user,
    organization,
  }: IRequest): Promise<Organization> {
    const organizationEmailAlreadyExists = await
    this.organizationsRepository.findByEmail(organization.email);
    const organizationCnpjAlreadyExists = await
    this.organizationsRepository.findByCnpj(organization.cnpj);
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email);
    const organizationTypeAlreadyExists = await this
      .organizationTypeRepository.findById(organization.organization_type_id);

    if (organizationEmailAlreadyExists) {
      throw new AppError('Organization email is already registered!');
    }

    if (organizationCnpjAlreadyExists) {
      throw new AppError('Organization cnpj is already registered!');
    }

    if (userAlreadyExists) {
      throw new AppError('User email is already registered!');
    }

    if (!organizationTypeAlreadyExists) {
      throw new AppError('Organization type does not exist!');
    }

    let addressId: string;
    if (organization.address) {
      const createdAddress = await this.addressesRepository.create(organization.address);
      addressId = createdAddress.id;
    }

    const passwordHash = await hash(user.password, 8);

    const newUser = await this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: passwordHash,
      is_volunteer: false,
      avatar: user.avatar,
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
