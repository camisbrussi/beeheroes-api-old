import { IUserDTO } from '../dtos/IUserDTO';
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
      email,
      status,
      is_volunteer,
    }: IUserDTO): Promise<Volunteer[]>;
  update({
    id,
    profession,
    description,
    occupation_area_id,
  }: IVolunteerDTO): Promise<Volunteer>;
}

export { IVolunteersRepository };
