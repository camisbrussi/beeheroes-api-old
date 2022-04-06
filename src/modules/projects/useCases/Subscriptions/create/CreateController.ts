import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSubscriptionUseCase } from './CreateUseCase';

class CreateSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      project_id,
      user_id,
    } = request.body;

    const createSubscriptionUseCase = container.resolve(CreateSubscriptionUseCase);

    const subscription = await createSubscriptionUseCase.execute({
      project_id,
      user_id,
    });

    return response.status(201).send(JSON.stringify(subscription));
  }
}

export { CreateSubscriptionController };
