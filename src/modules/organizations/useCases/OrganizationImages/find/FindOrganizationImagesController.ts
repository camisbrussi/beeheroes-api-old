import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindOrganizationImagesUseCase } from './FindOrganizationImagesUseCase';

class FindOrganizationImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;

    const findOrganizationImagesUseCase = container.resolve(FindOrganizationImagesUseCase);

    const images = await findOrganizationImagesUseCase.execute({
      organization_id: id,
    });

    return response.status(201).send({
      images,
    });
  }
}

export { FindOrganizationImagesController };
