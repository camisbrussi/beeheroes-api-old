import { inject, injectable } from 'tsyringe';

import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';
import { ItemListMap } from '@utils/mapper/ItemListMap';

interface IRequest {
  name?: string;
  status?: number;
  organization_id?: string;
  state_id?: number,
  city_id?: number;
  organization_type_id?: number;
}

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
    organization_type_id,
  }: IRequest): Promise<ItemListMap[]> {
    const donations = await this.donationsRepository.filter({
      name,
      status,
      organization_id,
      city_id,
      state_id,
      organization_type_id,
    });
    return donations;
  }
}

export { FilterDonationUseCase };
