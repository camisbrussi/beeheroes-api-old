import { IVolunteerDTO } from '../dtos/IVolunteerDTO';
import { Volunteer } from '../infra/typeorm/entities/Volunteer';

interface IVolunteersRepository{
  create({
    id,
    profession,
    description,
    occupation_area_id,
    user_id,
  }: IVolunteerDTO): Promise<Volunteer>;
  findById(id: string): Promise<Volunteer>;
  listVolunteersByOccupationArea(occupation_area_id: string): Promise<Volunteer[]>;
    filter({
      name,
      status,
      is_volunteer,
      state_id,
      city_id,
    }): Promise<Volunteer[]>;
  update({
    id,
    profession,
    description,
    occupation_area_id,
  }: IVolunteerDTO): Promise<Volunteer>;
}

export { IVolunteersRepository };
