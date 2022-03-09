import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEvaluationUseCase } from './CreateUseCase';

class CreateEvaluationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      score,
      description,
      subscription_id,
    } = request.body;

    const createEvaluationUseCase = container.resolve(CreateEvaluationUseCase);

    const evaluation = await createEvaluationUseCase.execute({
      score,
      description,
      subscription_id,
    });

    return response.status(201).send(JSON.stringify(evaluation));
  }
}

export { CreateEvaluationController };
