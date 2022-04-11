import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterUserUseCase } from './FilterUseCase';

class FilterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filter = {
      name: request.body.name,
      city_id: request.body.city_id,
      state_id: request.body.state_id,
      status: request.body.status,
      is_volunteer: request.body.is_volunteer,
    };

    const filterUserUseCase = container.resolve(FilterUserUseCase);

    const user = await filterUserUseCase.execute(filter);

    return response.status(200).json(user);
  }
}

export { FilterUserController };
