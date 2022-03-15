import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindRoleUseCase } from './FindUseCase';

class FindRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findRoleUseCase = container.resolve(FindRoleUseCase);

    const routes = await findRoleUseCase.execute(id);

    return response.status(200).json(routes);
  }
}

export { FindRoleController };
