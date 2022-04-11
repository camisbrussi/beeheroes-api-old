import { inject, injectable } from 'tsyringe';

import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id?:string;
  name: string,
  description?: string,
  total_value?: number,
  total_collected?: number,
  organization_id: string;
  status: number;
}

@injectable()
class CreateDonationUseCase {
  constructor(
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,
    @inject('OrganizationsRepository')
    private organizationRepository: IOrganizationsRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    total_value,
    total_collected,
    organization_id,
    status,
  }: IRequest): Promise<Donation> {
    const organizationExists = await
    this.organizationRepository.findById(organization_id);

    if (!organizationExists.organization) {
      throw new AppError('Organization does not exists!');
    }

    const donation = await this.donationsRepository.create({
      id,
      name,
      description,
      total_value,
      total_collected,
      organization_id,
      status,
    });

    return donation;
  }
}

export { CreateDonationUseCase };
