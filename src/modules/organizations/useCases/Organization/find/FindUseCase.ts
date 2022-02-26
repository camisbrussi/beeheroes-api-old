import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';

@injectable()
class FindOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) { }

  async execute(id: string): Promise<Organization> {

    const organization = await this.organizationsRepository.findById(id);

    if(!organization){
      throw new AppError('Organization does not exist')
    }

    return organization;
  }
}

export { FindOrganizationUseCase };