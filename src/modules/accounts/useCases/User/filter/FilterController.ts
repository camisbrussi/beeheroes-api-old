import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterUserUseCase } from './FilterUseCase';

class FilterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query } = request.body;
    const filter = {
      name: query.name,
      city_id: Number(query.city_id),
      state_id: Number(query.state_id),
      status: Number(query.status),
      is_volunteer: query.is_volunteer,
    };

    const filterUserUseCase = container.resolve(FilterUserUseCase);

    const user = await filterUserUseCase.execute(filter);

    return response.status(200).json(user);
  }
}

export { FilterUserController };
