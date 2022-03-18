import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateVolunteerUseCase } from './CreateUseCase';

class CreateVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      profession,
      description,
      occupation_area_id,
      user_id,
    } = request.body;

    const createVolunteerUseCase = container.resolve(CreateVolunteerUseCase);

    const volunteer = await createVolunteerUseCase.execute({
      id,
      profession,
      description,
      occupation_area_id,
      user_id,
    });

    return response.status(201).send(JSON.stringify(volunteer));
  }
}

export { CreateVolunteerController };
