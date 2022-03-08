import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSubscriptionUseCase } from './CreateUseCase';

class CreateSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      registration_date,
      project_id,
      volunteer_id,
    } = request.body;

    const createSubscriptionUseCase = container.resolve(CreateSubscriptionUseCase);

    const subscription = await createSubscriptionUseCase.execute({
      registration_date,
      project_id,
      volunteer_id,
    });

    return response.status(201).send(JSON.stringify(subscription));
  }
}

export { CreateSubscriptionController };
