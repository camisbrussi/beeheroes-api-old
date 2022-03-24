import { instanceToInstance } from 'class-transformer';

import { IVolunteerDTO } from '../dtos/IVolunteerDTO';

type Volunteer = {
  id: string;
  description: string;
  profession: string;
  occupation_area: {
    name: string,
  }
}

class VolunteerMap {
  static toDTO({
    id,
    description,
    profession,
    occupation_area,
  }: Volunteer): IVolunteerDTO {
    const organization = instanceToInstance({
      id,
      description,
      profession,
      occupation_area,
    });
    return organization;
  }
}

export { VolunteerMap };
