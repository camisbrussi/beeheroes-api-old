import { inject, injectable } from 'tsyringe';

import { Donation } from '@modules/donations/infra/typeorm/entities/Donation';
import { IDonationsRepository } from '@modules/donations/repositories/IDonationsRepository';

interface IRequest {
  id: string,
  name?: string,
  description?: string;
  total_value?: number;
  total_collected?: number;
  vacancies?: number;
  status?: number;
}
@injectable()
class UpdateDonationUseCase {
  constructor(
    @inject('DonationsRepository')
    private donationsRepository: IDonationsRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    total_value,
    total_collected,
    status,
  }: IRequest): Promise<Donation> {
    const donation = await this.donationsRepository.update({
      id,
      name,
      description,
      total_value,
      total_collected,
      status,
    });

    return donation;
  }
}

export { UpdateDonationUseCase };
