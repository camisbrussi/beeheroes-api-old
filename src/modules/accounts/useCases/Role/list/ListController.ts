import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRoleUseCase } from './ListUseCase';

class ListRolesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRolesUseCase = container.resolve(ListRoleUseCase);

    const all = await listRolesUseCase.execute();

    return response.json(all);
  }
}

export { ListRolesController };
