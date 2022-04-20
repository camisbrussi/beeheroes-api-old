import { Expose } from 'class-transformer';
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

import { User } from '../../../../accounts/infra/typeorm/entities/User';
import { Address } from '../../../../addresses/infra/typeorm/entities/Address';
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

  @Column()
  avatar: string;

  @ManyToOne(() => OrganizationType)
  @JoinColumn({ name: 'organization_type_id' })
  organizationType: OrganizationType;

  @Column()
  organization_type_id: string;

  @ManyToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column()
  address_id: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'organizations_users',
    joinColumns: [{ name: 'organization_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })

  users: User[];

  @Column()
  status: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.status = Number(process.env.ORGANIZATION_STATUS_AWAIT_AUTHORIZATION);
    }
  }
}

export { Organization };
