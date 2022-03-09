import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindEvaluationUseCase } from './FindUseCase';

class FindEvaluationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findEvaluationUseCase = container.resolve(FindEvaluationUseCase);

    const project = await findEvaluationUseCase.execute(id);

    return response.status(200).json(project);
  }
}

export { FindEvaluationController };
