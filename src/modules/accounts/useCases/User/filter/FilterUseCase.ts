import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

interface IResponse {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  status: number;
  is_volunteer: boolean;
  address: {
    district: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    uf: string;
  }
}

interface IRequest {
  name?: string;
  status?: number;
  is_volunteer?: boolean;
  state_id?: number,
  city_id?: number;
}

@injectable()
class FilterUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    name,
    status,
    is_volunteer,
    state_id,
    city_id,
  }: IRequest): Promise<IResponse[]> {
    const usersFiltered = await this.usersRepository.filter({
      name,
      status,
      is_volunteer,
      state_id,
      city_id,
    });

    const filterUsers = usersFiltered.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      status: user.status,
      is_volunteer: user.is_volunteer,
      address: {
        district: user.address?.district,
        street: user.address?.street,
        number: user.address?.number,
        complement: user.address?.complement,
        city: user.address?.city?.name,
        uf: user.address?.city?.state.uf,
      },
    }));

    return filterUsers;
  }
}

export { FilterUserUseCase };
