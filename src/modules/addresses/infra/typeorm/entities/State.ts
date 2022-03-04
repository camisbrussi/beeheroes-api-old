import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('states')
class State {
  @PrimaryGeneratedColumn('increment')
  id:number;

  @Column()
  name: string;

  @Column()
  uf: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { State };
