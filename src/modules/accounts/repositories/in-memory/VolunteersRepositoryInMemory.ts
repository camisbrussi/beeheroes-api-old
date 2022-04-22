import { IVolunteerDTO } from '@modules/accounts/dtos/IVolunteerDTO';
import { Volunteer } from '@modules/accounts/infra/typeorm/entities/Volunteer';

import { IVolunteersRepository } from '../IVolunteersRepository';

class VolunteersRepositoryInMemory implements IVolunteersRepository {
  volunteers: Volunteer[] = [];

  async create({

    description,
    occupation_area_id,
    user_id,
  }: IVolunteerDTO): Promise<Volunteer> {
    const volunteers = new Volunteer();

    Object.assign(volunteers, {
      description,
      occupation_area_id,
      user_id,

    });

    this.volunteers.push(volunteers);

    return (volunteers);
  }

  async findById(id: string): Promise<Volunteer> {
    const volunteer = this.volunteers.find((volunteers) => volunteers.id === id);
    return volunteer;
  }

  async update({
    id,
    description,
    occupation_area_id,
  }: IVolunteerDTO): Promise<Volunteer> {
    const findIndex = this.volunteers.findIndex((volunteers) => volunteers.id === id);

    if (description) this.volunteers[findIndex].description = description;
    if (occupation_area_id) this.volunteers[findIndex].occupation_area_id = occupation_area_id;

    return this.volunteers[findIndex];
  }

  async list(): Promise<Volunteer[]> {
    const all = this.volunteers;
    return all;
  }

  async listVolunteersByOccupationArea(occupation_area_id: number): Promise<Volunteer[]> {
    const volunteers = this.volunteers.filter((volunteers) => {
      if (volunteers.occupation_area_id === occupation_area_id) {
        return volunteers;
      }
      return null;
    });
    return volunteers;
  }
}

export { VolunteersRepositoryInMemory };
