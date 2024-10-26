import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @Column({ default: 'user' })
  role: string;
  @Column({ default: true })
  isActive: boolean;
}
