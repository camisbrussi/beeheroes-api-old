import { instanceToInstance } from 'class-transformer';

import { IVolunteerDTO } from '../dtos/IVolunteerDTO';
import { OccupationArea } from '../infra/typeorm/entities/OccupationArea';

type Volunteer = {
  id: string;
  user_id: string;
  description?: string;
  profession: string;
  avatar?: string;
  occupation_area: OccupationArea
  address?: {
    city: string;
    uf: string;
  }
}

class VolunteerMap {
  static toDTO({
    id,
    user_id,
    description,
    profession,
    occupation_area,
    address,
  }: Volunteer): IVolunteerDTO {
    const volunteer = instanceToInstance({
      id,
      user_id,
      description,
      profession,
      occupation_area,
      address,
    });
    return volunteer;
  }
}

export { VolunteerMap };
