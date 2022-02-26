import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUserTypesUseCase } from './LisUseCase';

class ListUserTypesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUserTypesUseCase = container.resolve(ListUserTypesUseCase);

    const all = await listUserTypesUseCase.execute();

    return response.json(all);
  }
}

export { ListUserTypesController };
