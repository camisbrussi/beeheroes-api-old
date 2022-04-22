import { instanceToInstance } from 'class-transformer';

import { IVolunteerDTO } from '../dtos/IVolunteerDTO';
import { OccupationArea } from '../infra/typeorm/entities/OccupationArea';

type Volunteer = {
  id: string;
  description?: string;
  occupation_area: OccupationArea
  user: {
    id: string;
    avatar?: string;
    name?: string;
    address?: {
      city: {
        name: string;
        state: {
          uf: string;
        }
      };
    }
  }
}

class VolunteerMap {
  static toDTO({
    id,
    user,
    description,
    occupation_area,
  }: Volunteer): IVolunteerDTO {
    const volunteer = instanceToInstance({
      id,
      user,
      description,
      occupation_area,
    });
    return volunteer;
  }
}

export { VolunteerMap };
