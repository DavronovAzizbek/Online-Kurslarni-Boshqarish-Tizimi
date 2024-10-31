import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Modules } from 'src/modules/entities/module.entity';
import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  price: number;

  @IsNotEmpty()
  @IsString()
  @Column()
  teacher: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  category: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  level: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @OneToMany(() => Modules, (module) => module.course)
  modules: Modules[];

  @ManyToMany(() => User, (user) => user.courses)
  @JoinTable()
  users: User[];

  @OneToMany(() => Lesson, (lesson) => lesson.module)
  lessons: Lesson[];
}
