import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  contentType: string;

  @ManyToOne(() => Modules, (modules) => modules.lessons)
  @JoinColumn()
  modules: Modules;

  @OneToMany(() => Assignment, (assignment) => assignment.lesson)
  assignments: Assignment[];
}
