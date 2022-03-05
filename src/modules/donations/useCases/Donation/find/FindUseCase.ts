import { inject, injectable } from 'tsyringe';

import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindDonationUseCase {
  constructor(
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,
  ) { }

  async execute(id: string): Promise<Donation> {
    const donation = await this.donationsRepository.findById(id);

    if (!donation) {
      throw new AppError('Donation does not exist');
    }

    return donation;
  }
}

export { FindDonationUseCase };
