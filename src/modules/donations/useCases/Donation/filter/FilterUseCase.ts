import { inject, injectable } from 'tsyringe';

import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';
import { ItemListMap } from '@utils/mapper/ItemListMap';

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
    city_id,
    state_id,
  }): Promise<ItemListMap[]> {
    const donations = await this.donationsRepository.filter({
      name,
      status,
      organization_id,
      city_id,
      state_id,
    });

    const listDonations = donations
      .map((donation) => (ItemListMap.toDTO({
        id: donation.id,
        name: donation.name,
        subtitle: donation.organization?.name,
        avatar: donation.organization?.avatar,
        city: donation.organization?.address?.city?.name,
        uf: donation.organization?.address?.city?.state.uf,
      })));

    return listDonations;
  }
}

export { FilterDonationUseCase };
