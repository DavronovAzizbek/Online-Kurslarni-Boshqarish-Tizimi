import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  homework: string;

  @Column({ nullable: true })
  teacherMessage?: string;

  @Column({ type: 'float', nullable: true })
  score?: number;

  @ManyToOne(() => Assignment, (assignment) => assignment.results)
  assignment: Assignment;

  @ManyToOne(() => User, (user) => user.results)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
