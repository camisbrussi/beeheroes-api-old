import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserAndVolunteerUseCase } from './CreateUseCase';

class CreateUserAndVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      user,
      volunteer,
    } = request.body;

    const createVolunteerUseCase = container.resolve(CreateUserAndVolunteerUseCase);

    const newVolunteer = await createVolunteerUseCase.execute({
      user,
      volunteer,
    });

    return response.status(201).send(JSON.stringify(newVolunteer));
  }
}

export { CreateUserAndVolunteerController };
