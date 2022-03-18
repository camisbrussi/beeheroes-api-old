import { inject, injectable } from 'tsyringe';

import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ItemListMap } from '@utils/mapper/ItemListMap';

@injectable()
class FilterVolunteerUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    name,
    password,
    email,
    status,
    is_volunteer = true,
  }: IUserDTO): Promise<ItemListMap[]> {
    const volunteers = await this.usersRepository.filter({
      name,
      password,
      email,
      status,
      is_volunteer,
    });

    console.log(volunteers);

    const listVolunteers = volunteers
      .map((organization) => (ItemListMap.toDTO({
        id: organization.id,
        name: organization.name,
        image_url: `${process.env.APP_API_URL}/avatar/${organization.avatar}`,
        city: organization.address?.city?.name,
        uf: organization.address?.city?.state.uf,
      })));

    return listVolunteers;
  }
}

export { FilterVolunteerUseCase };
