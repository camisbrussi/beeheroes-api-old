import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListVolunteersUseCase } from './ListUseCase';

class ListVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listVolunteersUseCase = container.resolve(ListVolunteersUseCase);

    const all = await listVolunteersUseCase.execute();

    return response.json(all);
  }
}

export { ListVolunteerController };
