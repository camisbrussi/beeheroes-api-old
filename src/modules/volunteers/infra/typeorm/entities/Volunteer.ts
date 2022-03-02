import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { OccupationArea } from './Occupation_area';

@Entity('volunteers')
class Volunteer {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  cpf: string;

  @Column()
  profession: string;

  @Column()
  avatar: string;

  @ManyToOne(() => OccupationArea)
  @JoinColumn({ name: 'occupation_area_id' })
  occupationArea: OccupationArea;

  @Column()
  occupation_area_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Volunteer };
