import { IVolunteerDTO } from '@modules/volunteers/dtos/IVolunteerDTO';
import { Volunteer } from '@modules/volunteers/infra/typeorm/entities/Volunteer';

import { IVolunteersRepository } from '../IVolunteersRepository';

class VolunteersRepositoryInMemory implements IVolunteersRepository {
  volunteers: Volunteer[] = [];

  async create({
    cpf,
    profession,
    description,
    occupation_area_id,
    address_id,
    user_id,
  }: IVolunteerDTO): Promise<Volunteer> {
    const volunteers = new Volunteer();

    Object.assign(volunteers, {
      cpf,
      profession,
      description,
      occupation_area_id,
      user_id,
      address_id,
    });

    this.volunteers.push(volunteers);

    return (volunteers);
  }

  async findById(id: string): Promise<Volunteer> {
    const volunteers = this.volunteers.find((volunteers) => volunteers.id === id);
    return volunteers;
  }

  async findByCpf(cpf: string): Promise<Volunteer> {
    const volunteers = this.volunteers.find((volunteers) => volunteers.cpf === cpf);
    return volunteers;
  }

  async update({
    id,
    profession,
    description,
    occupation_area_id,
    address_id,
  }: IVolunteerDTO): Promise<Volunteer> {
    const findIndex = this.volunteers.findIndex((volunteers) => volunteers.id === id);

    if (profession) this.volunteers[findIndex].profession = profession;
    if (description) this.volunteers[findIndex].description = description;
    if (occupation_area_id) this.volunteers[findIndex].occupation_area_id = occupation_area_id;
    if (address_id) this.volunteers[findIndex].address_id = address_id;

    return this.volunteers[findIndex];
  }

  async list(): Promise<Volunteer[]> {
    const all = this.volunteers;
    return all;
  }

  async listVolunteersByOccupationArea(occupation_area_id: string): Promise<Volunteer[]> {
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
