import { inject, injectable } from 'tsyringe';

import { OrganizationType } from '@modules/organizations/infra/typeorm/entities/OrganizationType';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest{
  name: string,
}

@injectable()
class CreateOrganizationTypeUseCase {
  constructor(
    @inject('OrganizationTypesRepository')
    private organizationTypeRepository: IOrganizationTypesRepository,
  ) {}

  async execute({ name }: IRequest): Promise<OrganizationType> {
    const organizationTypeExist = await this.organizationTypeRepository.findByName(name);

    if (organizationTypeExist) {
      throw new AppError('Organization type already exists!');
    }

    const organizationType = await this.organizationTypeRepository.create({
      name,
    });

    return organizationType;
  }
}

export { CreateOrganizationTypeUseCase };
