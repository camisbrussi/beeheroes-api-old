import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindEvaluationsByUserUseCase } from './FindUseCase';

class FindEvaluationsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findEvaluationUseCase = container.resolve(FindEvaluationsByUserUseCase);

    const evaluations = await findEvaluationUseCase.execute(id);

    return response.status(200).json(evaluations);
  }
}

export { FindEvaluationsByUserController };
