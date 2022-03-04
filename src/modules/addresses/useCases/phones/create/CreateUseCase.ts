import { inject, injectable } from 'tsyringe';

import { Phone } from '@modules/addresses/infra/typeorm/entities/Phone';
import { IPhonesRepository } from '@modules/addresses/repositories/IPhonesRepository';

export interface IRequestPhones {
  id?: string;
  number: string;
  is_whatsapp: boolean;
  organization_id?: string;
}
@injectable()
class CreatePhoneUseCase {
  constructor(
    @inject('PhonesRepository')
    private usersRepository: IPhonesRepository,
  ) {}

  async execute({
    id,
    number,
    is_whatsapp,
    organization_id,
  }: IRequestPhones): Promise<Phone> {
    const address = await this.usersRepository.create({
      id,
      number,
      is_whatsapp,
      organization_id,
    });

    return address;
  }
}

export { CreatePhoneUseCase };
