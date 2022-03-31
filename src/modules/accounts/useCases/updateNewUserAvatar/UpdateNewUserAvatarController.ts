import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateNewUserAvatarUseCase } from './UpdateNewUserAvatarUseCase';

class UpdateNewUserAvatarController {
  async handle(request:Request, response:Response): Promise<Response> {
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateNewUserAvatarUseCase);

    await updateUserAvatarUseCase.execute(avatar_file);

    return response.status(201).send(JSON.stringify(avatar_file));
  }
}

export { UpdateNewUserAvatarController };
