import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProjectUseCase } from './UpdateUseCase';

class UpdateProjectController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      start,
      end,
      vacancies,
      status,
    } = request.body.data;
    const id = request.query.id as string;

    const updateProjectUseCase = container.resolve(UpdateProjectUseCase);

    const project = await updateProjectUseCase.execute({
      id,
      name,
      description,
      start,
      end,
      vacancies,
      status,
    });

    return response.status(200).json(project);
  }
}

export { UpdateProjectController };
