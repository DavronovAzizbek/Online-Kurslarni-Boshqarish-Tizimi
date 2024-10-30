import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.enrollments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments, { eager: true })
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
