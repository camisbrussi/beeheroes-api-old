import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterUserUseCase } from './FilterUseCase';

class FilterUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filter = {
      name: request.body.name,
      email: request.body.email,
      status: request.body.status,
    };

    const filterUserUseCase = container.resolve(FilterUserUseCase);

    const user = await filterUserUseCase.execute(filter);

    return response.status(200).json(user);
  }
}

export { FilterUserController };
