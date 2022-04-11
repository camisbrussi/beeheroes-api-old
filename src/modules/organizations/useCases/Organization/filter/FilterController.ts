import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterOrganizationUseCase } from './FilterUseCase';

class FilterOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query } = request.body;
    const filter = {
      name: query.name,
      state_id: Number(query.state_id),
      city_id: Number(query.city_id),
      status: Number(query.status),
      organization_type_id: query.organization_type_id,
    };

    const filterOrganizationUseCase = container.resolve(FilterOrganizationUseCase);

    const organization = await filterOrganizationUseCase.execute(filter);

    return response.status(200).json(organization);
  }
}

export { FilterOrganizationController };
