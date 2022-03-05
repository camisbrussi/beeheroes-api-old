import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilterDonationUseCase } from './FilterUseCase';

class FilterDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filter = {
      name: request.body.name,
      start: request.body.status,
      organization_id: request.body.organization_id,
    };

    const filterDonationUseCase = container.resolve(FilterDonationUseCase);

    const donation = await filterDonationUseCase.execute(filter);

    return response.status(200).json(donation);
  }
}

export { FilterDonationController };
