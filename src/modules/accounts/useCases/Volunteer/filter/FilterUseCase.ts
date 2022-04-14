import { inject, injectable } from 'tsyringe';

import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';
import { ItemListMap } from '@utils/mapper/ItemListMap';

@injectable()
class FilterVolunteerUseCase {
  constructor(
    @inject('VolunteersRepository')
    private volunteersRepository: IVolunteersRepository,
  ) { }

  async execute({
    name,
    status,
    is_volunteer = true,
    state_id,
    city_id,
    occupation_area_id,
  }): Promise<ItemListMap[]> {
    const volunteers = await this.volunteersRepository.filter({
      name,
      status,
      is_volunteer,
      state_id,
      city_id,
      occupation_area_id,
    });

    return volunteers;
  }
}

export { FilterVolunteerUseCase };
