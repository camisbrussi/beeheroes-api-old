import { inject, injectable } from 'tsyringe';

import { Phone } from '@modules/addresses/infra/typeorm/entities/Phone';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindOrganizationUseCase {
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository,
  ) { }

  async execute(id: string): Promise<{
    organization: Organization,
    phones: Phone[]
  }> {
    const data = await this.organizationsRepository.findById(id);

    if (!data.organization) {
      throw new AppError('Organization does not exist');
    }

    return {
      organization: data.organization,
      phones: data.phones,
    };
  }
}

export { FindOrganizationUseCase };
