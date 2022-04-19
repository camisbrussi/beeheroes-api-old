import { instanceToInstance } from 'class-transformer';

type Evaluation = {
  id: string;
  score: number;
  description: string;
  project: {
    id: string;
    name:string
  }
  organization:
  {
    id: string;
    name: string;
    avatar: string;
  }
}

class EvaluationListMap {
  static toDTO({
    id,
    score,
    description,
    organization,
    project,
  }: Evaluation) {
    const evaluation = instanceToInstance({
      id,
      score,
      description,
      project,
      organization,
    });
    return evaluation;
  }
}

export { EvaluationListMap };
