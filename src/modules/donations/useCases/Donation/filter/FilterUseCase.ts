import { inject, injectable } from 'tsyringe';

import { IDonationDTO } from '@modules/donations/dtos/IDonationDTO';
import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FilterDonationUseCase {
  constructor(
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,
  ) { }

  async execute({
    name,
    status,
    organization_id,
  }: IDonationDTO): Promise<Donation[]> {
    const donation = await this.donationsRepository.filter({
      name,
      status,
      organization_id,
    });

    if (donation.length === 0) {
      throw new AppError('Donation does not exist');
    }

    return donation;
  }
}

export { FilterDonationUseCase };
