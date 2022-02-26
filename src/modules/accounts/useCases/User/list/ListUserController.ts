import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersUseCase } from './ListUserUseCase';

class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const all = await listUsersUseCase.execute();

    return response.json(all);
  }
}

export { ListUserController };
