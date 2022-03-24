import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindSubscriptionsByUserUseCase } from './FindUseCase';

class FindSubscriptionsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findSubscriptionUseCase = container.resolve(FindSubscriptionsByUserUseCase);

    const project = await findSubscriptionUseCase.execute(id);

    return response.status(200).json(project);
  }
}

export { FindSubscriptionsByUserController };
