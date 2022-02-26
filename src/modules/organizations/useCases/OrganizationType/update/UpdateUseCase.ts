import { inject, injectable } from 'tsyringe';

import { OrganizationType } from '@modules/organizations/infra/typeorm/entities/OrganizationType';
import { IOrganizationTypesRepository } from '@modules/organizations/repositories/IOrganizationTypesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string,
  name?:string,
  description?:string;
}
@injectable()
class UpdateOrganizationTypeUseCase {
  constructor(
    @inject('OrganizationTypesRepository')
    private organizationTypeRepository: IOrganizationTypesRepository,
  ) {}

  async execute({ id, name, description }: IRequest): Promise<OrganizationType> {
    const organizationTypeExist = await this.organizationTypeRepository.findByName(name);

    if (organizationTypeExist) {
      throw new AppError('Organization type already exists!');
    }

    const organizationType = await this.organizationTypeRepository.update({
      id,
      name,
      description,
    });

    return organizationType;
  }
}

export { UpdateOrganizationTypeUseCase };
