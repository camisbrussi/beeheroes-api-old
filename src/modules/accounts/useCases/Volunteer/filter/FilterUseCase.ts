import { inject, injectable } from 'tsyringe';

import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
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
  }): Promise<ItemListMap[]> {
    const volunteers = await this.volunteersRepository.filter({
      name,
      status,
      is_volunteer,
      state_id,
      city_id,
    });

    const listVolunteers = volunteers
      .map((volunteer) => (ItemListMap.toDTO({
        id: volunteer.user.id,
        name: volunteer.user.name,
        avatar: volunteer.user.avatar,
        city: volunteer.user.address?.city?.name,
        uf: volunteer.user.address?.city?.state.uf,
      })));

    return listVolunteers;
  }
}

export { FilterVolunteerUseCase };
