import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterVolunteerUseCase } from './FilterUseCase';

class FilterVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query } = request.body;

    const filter = {
      name: request.body.name,
      status: request.body.status,
      is_volunteer: request.body.is_volunteer,
      city_id: Number(query.city_id),
      state_id: Number(query.state_id),
      occupation_area_id: query.occupation_area_id,
    };

    const filterVolunteerUseCase = container.resolve(FilterVolunteerUseCase);

    const volunteer = await filterVolunteerUseCase.execute(filter);

    return response.status(200).json(volunteer);
  }
}

export { FilterVolunteerController };
