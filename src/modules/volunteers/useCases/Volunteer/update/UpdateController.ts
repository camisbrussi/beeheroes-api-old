import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateVolunteerUseCase } from './UpdateUseCase';

class UpdateVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      profession,
      description,
      avatar,
      occupation_area_id,
    } = request.body;
    const id = request.query.id as string;

    const updateVolunteerUseCase = container.resolve(UpdateVolunteerUseCase);

    const volunteer = await updateVolunteerUseCase.execute({
      id,
      profession,
      description,
      avatar,
      occupation_area_id,
    });

    return response.status(200).json(volunteer);
  }
}

export { UpdateVolunteerController };
