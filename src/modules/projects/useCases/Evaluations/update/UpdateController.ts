import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateEvaluationUseCase } from './UpdateUseCase';

class UpdateEvaluationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      score,
      description,
    } = request.body;
    const id = request.query.id as string;

    const updateEvaluationUseCase = container.resolve(UpdateEvaluationUseCase);

    const evaluation = await updateEvaluationUseCase.execute({
      id,
      score,
      description,
    });

    return response.status(200).json(evaluation);
  }
}

export { UpdateEvaluationController };
