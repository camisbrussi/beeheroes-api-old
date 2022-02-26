import { inject, injectable } from 'tsyringe';

import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  cnpj: string;
  description: string;
  organization_type_id: string;
}

@injectable()
class CreateOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) {}

  async execute({
    name,
    email,
    description,
    cnpj,
    organization_type_id,
  }: IRequest): Promise<Organization> {
    const organizationAlreadyExists = await this.organizationsRepository.findByEmail(email);

    if (organizationAlreadyExists) {
      throw new AppError(`Organization ${email} already exists`);
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      description,
      cnpj,
      organization_type_id,
    });

    return organization;
  }
}

export { CreateOrganizationUseCase };
