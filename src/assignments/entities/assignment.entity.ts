import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: 'auto' })
  gradingType: string;

  @Column({ nullable: true })
  moduleId: number;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;

  @Column({ type: 'text', nullable: true })
  response: string;

  @ManyToOne(() => Modules, (module) => module.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'moduleId' })
  module: Modules;
  results: any;
}
