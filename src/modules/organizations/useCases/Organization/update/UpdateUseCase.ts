import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IOrganizationsRepository } from '@modules/organizations/repositories/IOrganizationRepository';
import { Organization } from '@modules/organizations/infra/typeorm/entities/Organization';

interface IRequest {
  id: string,
  name?:string,
  description?:string;
  email?:string;
  cnpj?:string;
  organization_type_id?: string;
  status?: number;
}
@injectable()
class UpdateOrganizationUseCase{
  constructor(
    @inject('OrganizationsRepository')
    private organizationsRepository: IOrganizationsRepository
  ){}

  async execute({ 
    id,
    name,
    email,
    description,
    cnpj,
    organization_type_id,
    status 
  }: IRequest): Promise<Organization> {
    const organizationExist = await this.organizationsRepository.findByEmail(email);

    if(organizationExist) {
      throw new AppError("Organization already exists!")
    }
    
    const organizationType = await this.organizationsRepository.update({
      id,
      name,
      email,
      description,
      cnpj,
      organization_type_id,
      status
    });

    return organizationType;
  }
}

export { UpdateOrganizationUseCase }