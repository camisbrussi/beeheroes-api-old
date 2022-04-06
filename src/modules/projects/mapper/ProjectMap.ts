import { instanceToInstance } from 'class-transformer';

import { IProjectDTO } from '../dtos/IProjectDTO';

type Project = {
  id: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  status: number;
  vacancies: number;
  total_subscription: number;
  organization: {
    id: string;
    name: string;
    description: string;
    email: string;
    cnpj: string;
    avatar: string;
  organization_type: {
    id: string;
    name: string;
    description: string;
  };
  address: {
    id: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    cep: number;
    city: {
      id: number;
      name: string;
      state: {
        id: number;
        name: string;
        uf: string;
      }
    }
  };
  };
}

class ProjectMap {
  static toDTO({
    id,
    name,
    description,
    start,
    end,
    status,
    vacancies,
    total_subscription,
    organization,
  }: Project): IProjectDTO {
    const project = instanceToInstance({
      id,
      name,
      description,
      start,
      end,
      status,
      vacancies,
      total_subscription,
      organization,
    });
    return project;
  }
}

export { ProjectMap };
