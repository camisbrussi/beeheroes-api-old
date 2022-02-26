import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOrganizationsUseCase } from './ListUseCase';

class ListOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOrganizationsUseCase = container.resolve(ListOrganizationsUseCase);

    const all = await listOrganizationsUseCase.execute();

    return response.json(all);
  }
}

export { ListOrganizationController };
