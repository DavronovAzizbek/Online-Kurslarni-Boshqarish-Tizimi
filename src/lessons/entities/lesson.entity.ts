import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';

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
}
