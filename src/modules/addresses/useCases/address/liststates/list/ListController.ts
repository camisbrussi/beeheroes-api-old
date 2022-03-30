import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListStatesUseCase } from './ListUseCase';

class ListStatesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listStatesseCase = container.resolve(ListStatesUseCase);

    const all = await listStatesseCase.execute();

    return response.json(all);
  }
}

export { ListStatesController };
