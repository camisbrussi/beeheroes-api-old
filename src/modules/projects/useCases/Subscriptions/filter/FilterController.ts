import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterSubscriptionUseCase } from './FilterUseCase';

class FilterSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      registration_date,
      participation_date,
      project_id,
      user_id,
      status,
    } = request.body;

    const filterSubscriptionUseCase = container.resolve(FilterSubscriptionUseCase);

    const project = await filterSubscriptionUseCase.execute({
      registration_date,
      participation_date,
      project_id,
      user_id,
      status,
    });

    return response.status(200).json(project);
  }
}

export { FilterSubscriptionController };
