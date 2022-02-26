import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterOrganizationUseCase } from './FilteUseCase';

class FilterOrganizationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filter = {
      name: request.body.name,
      email: request.body.email,
      status: request.body.status,
      organization_type_id: request.body.organization_type_id,
    };

    const filterOrganizationUseCase = container.resolve(FilterOrganizationUseCase);

    const organization = await filterOrganizationUseCase.execute(filter);

    return response.status(200).json(organization);
  }
}

export { FilterOrganizationController };
