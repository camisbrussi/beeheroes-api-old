import { inject, injectable } from 'tsyringe';

import { IDonationDTO } from '@modules/donations/dtos/IDonationDTO';
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
  }: IDonationDTO): Promise<ItemListMap[]> {
    const donations = await this.donationsRepository.filter({
      name,
      status,
      organization_id,
    });

    const listDonations = donations
      .map((donation) => (ItemListMap.toDTO({
        id: donation.id,
        name: donation.name,
        subtitle: donation.organization?.name,
        image_url: `${process.env.APP_API_URL}/avatar/${donation.organization?.avatar}`,
        city: donation.organization?.address?.city?.name,
        uf: donation.organization?.address?.city?.state.uf,
      })));

    return listDonations;
  }
}

export { FilterDonationUseCase };
