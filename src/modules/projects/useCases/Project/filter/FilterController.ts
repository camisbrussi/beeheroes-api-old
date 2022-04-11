import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterProjectUseCase } from './FilterUseCase';

class FilterProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { query } = request.body;
    const filter = {
      name: query.name,
      start: query.start,
      end: query.end,
      organization_type_id: query.organization_type_id,
      status: Number(query.status),
      city_id: Number(query.city_id),
      state_id: Number(query.state_id),
      organization_id: query.organization_id,
    };

    const filterProjectUseCase = container.resolve(FilterProjectUseCase);

    const project = await filterProjectUseCase.execute(filter);

    return response.status(200).json(project);
  }
}

export { FilterProjectController };
