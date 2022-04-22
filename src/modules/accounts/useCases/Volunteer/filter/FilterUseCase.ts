import { inject, injectable } from 'tsyringe';

import { VolunteerMap } from '@modules/accounts/mapper/VolunteerMap';
import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';

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
      occupation_area: volunteer.occupationArea.name,
      user: {
        id: volunteer.user.id,
        avatar: volunteer.user.avatar,
        name: volunteer.user.name,
        address: {
          city: {
            name: volunteer.user.address.city.name,
            state: {
              uf: volunteer.user.address.city.state.uf,
            },
          },
        },
      },
    }));

    return filterVolunteers;
  }
}

export { FilterVolunteerUseCase };
