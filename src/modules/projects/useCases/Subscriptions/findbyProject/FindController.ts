import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindSubscriptionsByProjectUseCase } from './FindUseCase';

class FindSubscriptionsByProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findSubscriptionUseCase = container.resolve(FindSubscriptionsByProjectUseCase);

    const project = await findSubscriptionUseCase.execute(id);

    return response.status(200).json(project);
  }
}

export { FindSubscriptionsByProjectController };
