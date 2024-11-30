import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Modules, (module) => module.lessons)
  module: Modules;

  @Column({ type: 'json', nullable: true })
  assignments: any;
}
