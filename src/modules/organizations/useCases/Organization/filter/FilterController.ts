import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterOrganizationUseCase } from './FilterUseCase';

class FilterOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filter = {
      name: request.body.name,
      state_id: Number(request.body.state_id),
      city_id: Number(request.body.city_id),
      status: Number(request.body.status),
      organization_type_id: request.body.organization_type_id,
    };

    const filterOrganizationUseCase = container.resolve(FilterOrganizationUseCase);

    const organization = await filterOrganizationUseCase.execute(filter);

    return response.status(200).json(organization);
  }
}

export { FilterOrganizationController };
