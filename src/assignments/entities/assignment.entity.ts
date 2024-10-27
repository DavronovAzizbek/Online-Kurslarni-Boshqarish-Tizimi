import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';
import { Result } from 'src/results/entities/result.entity';

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

  @ManyToOne(() => Modules, (module) => module.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'moduleId' })
  module: Modules;

  @OneToMany(() => Result, (result) => result.assignment)
  results: Result[];
}
