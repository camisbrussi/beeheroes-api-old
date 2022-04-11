import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { userPermissions } from '@utils/userPermissions';
import { validateUserPermissions } from '@utils/validateUserPermissions';

import { CreateDonationUseCase } from './CreateUseCase';

class CreateDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const user = await userPermissions(request);

    // const hasAllPermissions = validateUserPermissions({
    //   user,
    //   permissions: ['donation.create'],
    //   roles: ['administrator', 'responsible'],
    // });

    // if (!hasAllPermissions) {
    //   throw new AppError('User without permission!', 401);
    // }

    const {
      id,
      name,
      description,
      total_value,
      total_collected,
      organization_id,
      status,
    } = request.body;

    const createDonationUseCase = container.resolve(CreateDonationUseCase);

    const donation = await createDonationUseCase.execute({
      id,
      name,
      description,
      total_value,
      total_collected,
      organization_id,
      status,
    });

    return response.status(201).send(JSON.stringify(donation));
  }
}

export { CreateDonationController };
