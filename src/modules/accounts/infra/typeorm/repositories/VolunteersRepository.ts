import { getRepository, Repository } from 'typeorm';

import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { IVolunteerDTO } from '@modules/accounts/dtos/IVolunteerDTO';
import { IVolunteersRepository } from '@modules/accounts/repositories/IVolunteersRepository';

import { Volunteer } from '../entities/Volunteer';

class VolunteersRepository implements IVolunteersRepository {
  private repository: Repository<Volunteer>

  constructor() {
    this.repository = getRepository(Volunteer);
  }

  async create({
    id,
    profession,
    description,
    occupation_area_id,
    user_id,

  }: IVolunteerDTO): Promise<Volunteer> {
    const volunteer = this.repository.create({
      id,
      profession,
      description,
      occupation_area_id,
      user_id,

    });

    await this.repository.save(volunteer);

    return volunteer;
  }

  async findById(id: string): Promise<Volunteer> {
    const volunteer = this.repository
      .createQueryBuilder('volunteer')
      .leftJoinAndSelect('volunteer.occupationArea', 'occupationArea')
      .where('volunteer.user_id =:id', { id })
      .getOne();
    return volunteer;
  }

  async listVolunteersByOccupationArea(occupation_area_id: string): Promise<Volunteer[]> {
    const volunteers = await this.repository.find({ occupation_area_id });

    return volunteers;
  }

  async filter({
    is_volunteer,
    name,
    status,
    state_id,
    city_id,
    occupation_area_id,
  }): Promise<Volunteer[]> {
    const volunteersQuery = await this.repository
      .createQueryBuilder('volunteer')
      .leftJoinAndSelect('volunteer.user', 'user')
      .leftJoinAndSelect('volunteer.occupationArea', 'occupationArea')
      .leftJoinAndSelect('user.address', 'addresses')
      .leftJoinAndSelect('addresses.city', 'cities')
      .leftJoinAndSelect('cities.state', 'states')
      .where('1 = 1');

    if (name) {
      volunteersQuery.andWhere('user.name ilike :name', { name: `%${name}%` });
    }

    if (status) {
      volunteersQuery.andWhere('user.status = :status', { status });
    }
    if (city_id) {
      volunteersQuery.andWhere('cities.id = :city_id', { city_id });
    }

    if (state_id) {
      volunteersQuery.andWhere('states.id = :state_id', { state_id });
    }

    if (is_volunteer) {
      volunteersQuery.andWhere('user.is_volunteer = :is_volunteer', { is_volunteer });
    }

    if (occupation_area_id) {
      volunteersQuery.andWhere('occupationArea.id = :occupation_area_id', { occupation_area_id });
    }

    const volunteers = await volunteersQuery.getMany();

    console.log(volunteers);

    return volunteers;
  }

  async update({
    id,
    profession,
    description,
    occupation_area_id,
  }: IVolunteerDTO): Promise<Volunteer> {
    const setVolunteer: IVolunteerDTO = { };

    if (profession) setVolunteer.profession = profession;
    if (description) setVolunteer.description = description;
    if (occupation_area_id) setVolunteer.occupation_area_id = occupation_area_id;

    const volunteerTypeEdited = await this.repository
      .createQueryBuilder()
      .update()
      .set(setVolunteer)
      .where('id = :id')
      .setParameters({ id })
      .execute();

    return volunteerTypeEdited.raw;
  }
}

export { VolunteersRepository };
