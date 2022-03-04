import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Organization } from '../../../../organizations/infra/typeorm/entities/Organization';

@Entity('phones')
class Phone {
  @PrimaryColumn()
  id: string

  @Column()
  number: string;

  @Column()
  is_whatsapp: boolean;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column()
  organization_id: string;

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

export { Phone };
