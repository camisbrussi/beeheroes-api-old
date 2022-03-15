import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRolesUseCase } from './LisUseCase';

class ListRolesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRolesUseCase = container.resolve(ListRolesUseCase);

    const all = await listRolesUseCase.execute();

    return response.json(all);
  }
}

export { ListRolesController };
