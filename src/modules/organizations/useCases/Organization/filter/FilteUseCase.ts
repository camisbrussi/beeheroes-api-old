import { inject, injectable } from 'tsyringe';

import { IOrganizationDTO } from '@modules/organizations/dtos/IOrganizationDTO';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FilterOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) { }

  async execute({
    name,
    email,
    description,
    cnpj,
    status,
    organization_type_id,
  }: IOrganizationDTO): Promise<Organization[]> {
    const organization = await this.organizationsRepository.filter({
      name,
      email,
      description,
      cnpj,
      status,
      organization_type_id,
    });

    if (!organization) {
      throw new AppError('Organization does not exist');
    }

    return organization;
  }
}

export { FilterOrganizationUseCase };
