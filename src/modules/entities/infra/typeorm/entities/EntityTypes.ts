import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('entity_types')
class EntityType {
  @PrimaryColumn()
  id:string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  constructor(){
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { EntityType }