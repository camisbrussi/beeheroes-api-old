import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateDonationUseCase } from './UpdateUseCase';

class UpdateDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
      total_value,
      total_collected,
      status,
    } = request.body;
    const id = request.query.id as string;

    const updateDonationUseCase = container.resolve(UpdateDonationUseCase);

    const donation = await updateDonationUseCase.execute({
      id,
      name,
      description,
      total_value,
      total_collected,
      status,
    });

    return response.status(200).json(donation);
  }
}

export { UpdateDonationController };
