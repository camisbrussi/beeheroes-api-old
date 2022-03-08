import { getRepository, Repository } from 'typeorm';

import { IVolunteerDTO } from '@modules/volunteers/dtos/IVolunteerDTO';
import { IVolunteersRepository } from '@modules/volunteers/repositories/IVolunteersRepository';

import { Volunteer } from '../entities/Volunteer';

class VolunteersRepository implements IVolunteersRepository {
  private repository: Repository<Volunteer>

  constructor() {
    this.repository = getRepository(Volunteer);
  }

  async create({
    id,
    cpf,
    profession,
    description,
    occupation_area_id,
    user_id,
    address_id,
  }: IVolunteerDTO): Promise<Volunteer> {
    const volunteer = this.repository.create({
      id,
      cpf,
      profession,
      description,
      occupation_area_id,
      user_id,
      address_id,
    });

    await this.repository.save(volunteer);

    return volunteer;
  }

  async findById(id: string): Promise<Volunteer> {
    const volunteer = await this.repository.createQueryBuilder('volunteer')
      .leftJoinAndSelect('volunteer.address', 'addresses')
      .where('volunteer.id =:id', { id })
      .getOne();

    return volunteer;
  }

  async findByCpf(cpf: string): Promise<Volunteer> {
    const volunteer = await this.repository.createQueryBuilder('volunteer')
      .leftJoinAndSelect('volunteer.address', 'addresses')
      .where('volunteer.cpf =:cpf', { cpf })
      .getOne();

    return volunteer;
  }

  async list(): Promise<Volunteer[]> {
    const volunteer = await this.repository.find();
    return volunteer;
  }

  async listVolunteersByOccupationArea(occupation_area_id: string): Promise<Volunteer[]> {
    const volunteers = await this.repository.find({ occupation_area_id });

    return volunteers;
  }

  async update({
    id,
    cpf,
    profession,
    description,
    occupation_area_id,
    address_id,
  }: IVolunteerDTO): Promise<Volunteer> {
    const setVolunteer: IVolunteerDTO = { };

    if (cpf) setVolunteer.cpf = cpf;
    if (profession) setVolunteer.profession = profession;
    if (description) setVolunteer.description = description;
    if (occupation_area_id) setVolunteer.occupation_area_id = occupation_area_id;
    if (address_id) setVolunteer.address_id = address_id;

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
