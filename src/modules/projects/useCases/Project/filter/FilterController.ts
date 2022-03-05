import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterProjectUseCase } from './FilterUseCase';

class FilterProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filter = {
      name: request.body.name,
      start: request.body.start,
      end: request.body.end,
      organization_id: request.body.organization_id,
    };

    const filterProjectUseCase = container.resolve(FilterProjectUseCase);

    const project = await filterProjectUseCase.execute(filter);

    return response.status(200).json(project);
  }
}

export { FilterProjectController };
