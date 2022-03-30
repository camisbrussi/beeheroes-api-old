import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCitiesUseCase } from './ListUseCase';

class ListCitiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const listCitiesUseCase = container.resolve(ListCitiesUseCase);

    const all = await listCitiesUseCase.execute(Number(id));

    return response.json(all);
  }
}

export { ListCitiesController };
