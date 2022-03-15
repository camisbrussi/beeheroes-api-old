import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { userPermissions } from '@utils/userPermissions';
import { validateUserPermissions } from '@utils/validateUserPermissions';

import { UpdateDonationUseCase } from './UpdateUseCase';

class UpdateDonationController {
  async handle(request: Request, response: Response): Promise<Response> {
    // const user = await userPermissions(request);

    // const hasAllPermissions = validateUserPermissions({
    //   user,
    //   permissions: ['donation.edit'],
    //   roles: ['administrator', 'responsible'],
    // });

    // if (!hasAllPermissions) {
    //   throw new AppError('User without permission!', 401);
    // }

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
