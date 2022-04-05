import { inject, injectable } from 'tsyringe';

import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
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

@injectable()
class FilterUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    name,
    email,
    status,
    is_volunteer,
  }: IUserDTO): Promise<IResponse[]> {
    const usersFiltered = await this.usersRepository.filter({
      name,
      email,
      status,
      is_volunteer,
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
