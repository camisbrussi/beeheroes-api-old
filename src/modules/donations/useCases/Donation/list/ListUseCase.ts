import { inject, injectable } from 'tsyringe';

import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';

@injectable()
class ListDonationsUseCase {
  constructor(
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,
  ) { }

  async execute(): Promise<Donation[]> {
    const donation = await this.donationsRepository.list();

    return donation;
  }
}

export { ListDonationsUseCase };
