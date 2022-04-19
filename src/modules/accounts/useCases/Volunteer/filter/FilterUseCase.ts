import { inject, injectable } from 'tsyringe';

import { VolunteerMap } from '@modules/accounts/mapper/VolunteerMap';
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
  }): Promise<VolunteerMap[]> {
    const volunteersFiltered = await this.volunteersRepository.filter({
      name,
      status,
      is_volunteer,
      state_id,
      city_id,
      occupation_area_id,
    });

    const filterVolunteers = volunteersFiltered.map((volunteer) => ({
      id: volunteer.id,
      user_id: volunteer.user_id,
      occupation_area: volunteer.occupationArea.name,
      avatar: volunteer.user.avatar,
      address: {
        city: volunteer.user.address?.city?.name,
        uf: volunteer.user.address?.city?.state.uf,
      },
    }));

    return filterVolunteers;
  }
}

export { FilterVolunteerUseCase };
