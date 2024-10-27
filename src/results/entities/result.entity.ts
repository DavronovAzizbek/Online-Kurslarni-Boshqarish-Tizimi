import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assignment, (assignment) => assignment.results)
  assignment: Assignment;

  @ManyToOne(() => User, (user) => user.results)
  user: User;

  @Column()
  score: number;

  @Column()
  submittedAt: Date;

  @Column({ default: false })
  isGraded: boolean;
}
