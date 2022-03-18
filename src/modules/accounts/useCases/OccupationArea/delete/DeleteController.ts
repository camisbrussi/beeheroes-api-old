import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteOccupationAreaUseCase } from './DeleteUseCase';

class DeleteOccupationAreaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const deleteOccupationAreaUseCase = container.resolve(DeleteOccupationAreaUseCase);

    const occupationArea = await deleteOccupationAreaUseCase.execute(id);

    return response.status(200).json(occupationArea);
  }
}

export { DeleteOccupationAreaController };
