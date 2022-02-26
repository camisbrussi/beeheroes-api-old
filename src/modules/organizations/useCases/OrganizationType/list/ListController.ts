import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListOrganizationTypesUseCase } from './LisUseCase';

class ListOrganizationTypesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOrganizationTypesUseCase = container.resolve(ListOrganizationTypesUseCase);

    const all = await listOrganizationTypesUseCase.execute();

    return response.json(all);
  }
}

export { ListOrganizationTypesController };
