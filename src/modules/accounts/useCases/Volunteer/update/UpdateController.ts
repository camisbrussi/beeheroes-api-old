import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateVolunteerUseCase } from './UpdateUseCase';

class UpdateVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      description,
      occupation_area_id,
    } = request.body.data;
    const id = request.query.id as string;

    const updateVolunteerUseCase = container.resolve(UpdateVolunteerUseCase);

    const volunteer = await updateVolunteerUseCase.execute({
      id,
      description,
      occupation_area_id,
    });

    return response.status(200).json(volunteer);
  }
}

export { UpdateVolunteerController };
