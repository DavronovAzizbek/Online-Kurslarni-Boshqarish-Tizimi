import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  contentType: 'text';

  @ManyToOne(() => Modules, (module) => module.lessons)
  module: Modules;
}
