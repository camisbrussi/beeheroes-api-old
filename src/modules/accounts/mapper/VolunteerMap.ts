import { instanceToInstance } from 'class-transformer';

import { IVolunteerDTO } from '../dtos/IVolunteerDTO';

type Volunteer = {
  id: string;
  user_id: string;
  description: string;
  profession: string;
  occupation_area: {
    name: string,
  }
}

class VolunteerMap {
  static toDTO({
    id,
    user_id,
    description,
    profession,
    occupation_area,
  }: Volunteer): IVolunteerDTO {
    const organization = instanceToInstance({
      id,
      user_id,
      description,
      profession,
      occupation_area,
    });
    return organization;
  }
}

export { VolunteerMap };
