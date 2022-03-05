import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProjectUseCase } from './CreateUseCase';

class CreateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      start,
      end,
      vacancies,
      organization_id,
    } = request.body;

    const createProjectUseCase = container.resolve(CreateProjectUseCase);

    const project = await createProjectUseCase.execute({
      name,
      description,
      start,
      end,
      vacancies,
      organization_id,
    });

    return response.status(201).send(JSON.stringify(project));
  }
}

export { CreateProjectController };
