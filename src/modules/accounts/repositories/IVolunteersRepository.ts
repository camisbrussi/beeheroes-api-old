import { IVolunteerDTO } from '../dtos/IVolunteerDTO';
import { Volunteer } from '../infra/typeorm/entities/Volunteer';

interface IVolunteersRepository{
  create({
    id,
    description,
    occupation_area_id,
    user_id,
  }: IVolunteerDTO): Promise<Volunteer>;
  findById(id: string): Promise<Volunteer>;
  listVolunteersByOccupationArea(occupation_area_id: number): Promise<Volunteer[]>;
  update({
    id,
    description,
    occupation_area_id,
  }: IVolunteerDTO): Promise<Volunteer>;
}

export { IVolunteersRepository };
