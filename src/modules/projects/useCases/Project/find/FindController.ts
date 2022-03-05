import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindProjectUseCase } from './FindUseCase';

class FindProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findProjectUseCase = container.resolve(FindProjectUseCase);

    const project = await findProjectUseCase.execute(id);

    return response.status(200).json(project);
  }
}

export { FindProjectController };
