import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindVolunteerUseCase } from './FindUseCase';

class FindVolunteerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findVolunteerUseCase = container.resolve(FindVolunteerUseCase);

    const volunteer = await findVolunteerUseCase.execute(id);

    return response.status(200).json(volunteer);
  }
}

export { FindVolunteerController };
