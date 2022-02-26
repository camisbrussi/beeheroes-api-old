import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { OrganizationType } from './OrganizationType';

@Entity('organizations')
class Organization {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @ManyToOne(() => OrganizationType)
  @JoinColumn({ name: 'organization_type_id' })
  organizationType: OrganizationType;

  @Column()
  organization_type_id: string;

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.status = Number(process.env.ORGANIZATION_STATUS_AWAIT);
    }
  }
}

export { Organization };
