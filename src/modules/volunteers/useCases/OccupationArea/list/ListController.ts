import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOccupationAreaUseCase } from './LisUseCase';

class ListOccupationAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOccupationAreaUseCase = container.resolve(ListOccupationAreaUseCase);

    const all = await listOccupationAreaUseCase.execute();

    return response.json(all);
  }
}

export { ListOccupationAreaController };
