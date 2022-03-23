import { inject, injectable } from 'tsyringe';

import { DonationMap } from '@modules/donations/mapper/DonationMap';
import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class FindDonationUseCase {
  constructor(
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,
  ) { }

  async execute(id: string): Promise<DonationMap> {
    const donation = await this.donationsRepository.findById(id);

    if (!donation) {
      throw new AppError('Donation does not exist');
    }

    return DonationMap.toDTO({
      id: donation.id,
      name: donation.name,
      description: donation.name,
      total_value: donation.total_value,
      total_collected: donation.total_collected,
      status: donation.status,
      organization: {
        id: donation.organization?.id,
        name: donation.organization?.name,
        description: donation.organization?.description,
        email: donation.organization?.email,
        cnpj: donation.organization?.cnpj,
        avatar_url: donation.organization.avatar ? `${process.env.APP_API_URL}/avatar/${donation.organization.avatar}` : null,
        organization_type: {
          name: donation.organization?.organizationType?.name,
        },
      },
    });
  }
}

export { FindDonationUseCase };
