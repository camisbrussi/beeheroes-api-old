import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterVolunteerUseCase } from './FilterUseCase';

class FilterVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filter = {
      name: request.body.name,
      email: request.body.email,
      status: request.body.status,
      is_volunteer: request.body.is_volunteer,
    };

    const filterVolunteerUseCase = container.resolve(FilterVolunteerUseCase);

    const user = await filterVolunteerUseCase.execute(filter);

    return response.status(200).json(user);
  }
}

export { FilterVolunteerController };
