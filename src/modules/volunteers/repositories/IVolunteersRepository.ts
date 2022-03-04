import { IVolunteerDTO } from '../dtos/IVolunteerDTO';
import { Volunteer } from '../infra/typeorm/entities/Volunteer';

interface IVolunteersRepository{
  create({
    id,
    cpf,
    profession,
    description,
    avatar,
    occupation_area_id,
    user_id,
  }: IVolunteerDTO): Promise<Volunteer>;
  findById(id: string): Promise<Volunteer>;
  findByCpf(cpf: string): Promise<Volunteer>;
  listVolunteersByOccupationArea(occupation_area_id: string): Promise<Volunteer[]>;
  list(): Promise<Volunteer[]>
  update({
    id,
    cpf,
    profession,
    description,
    avatar,
    occupation_area_id,
  }: IVolunteerDTO): Promise<Volunteer>;
}

export { IVolunteersRepository };