import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterUserUseCase } from './FilterUseCase';

class FilterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filter = {
      name: request.body.name,
      city_id: Number(request.body.city_id),
      state_id: Number(request.body.state_id),
      status: Number(request.body.status),
      is_volunteer: request.body.is_volunteer,
    };

    const filterUserUseCase = container.resolve(FilterUserUseCase);

    const user = await filterUserUseCase.execute(filter);

    return response.status(200).json(user);
  }
}

export { FilterUserController };
