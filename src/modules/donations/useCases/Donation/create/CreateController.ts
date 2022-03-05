import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDonationUseCase } from './CreateUseCase';

class CreateDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      description,
      total_value,
      total_collected,
      organization_id,
    } = request.body;

    const createDonationUseCase = container.resolve(CreateDonationUseCase);

    const donation = await createDonationUseCase.execute({
      id,
      name,
      description,
      total_value,
      total_collected,
      organization_id,
    });

    return response.status(201).send(JSON.stringify(donation));
  }
}

export { CreateDonationController };
