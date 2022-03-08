import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadOrganizationImageUseCase } from './UploadUseCase';

interface IFiles {
  filename: string;
}

class UploadOrganizationImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.query.id as string;
    const images = request.files as IFiles[];

    const uploadOrganizationImagesUseCase = container.resolve(UploadOrganizationImageUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadOrganizationImagesUseCase.execute({
      organization_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadOrganizationImagesController };
