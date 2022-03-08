import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '../../../../accounts/infra/typeorm/entities/User';
import { Address } from '../../../../addresses/infra/typeorm/entities/Address';
import { OccupationArea } from './OccupationArea';

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

  @ManyToOne(() => OccupationArea)
  @JoinColumn({ name: 'occupation_area_id' })
  occupationArea: OccupationArea;

  @Column()
  occupation_area_id: string;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column()
  address_id: string;

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
