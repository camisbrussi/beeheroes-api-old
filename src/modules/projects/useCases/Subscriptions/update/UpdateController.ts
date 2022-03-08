import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSubscriptionUseCase } from './UpdateUseCase';

class UpdateSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      registration_date,
      participation_date,
      status,
    } = request.body;
    const id = request.query.id as string;

    const updateSubscriptionUseCase = container.resolve(UpdateSubscriptionUseCase);

    const project = await updateSubscriptionUseCase.execute({
      id,
      registration_date,
      participation_date,
      status,
    });

    return response.status(200).json(project);
  }
}

export { UpdateSubscriptionController };
