import type { UserEntity } from '@backend/user/entities/UserEntity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('resumes')
export class ResumeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('UserEntity', 'resumes')
  user: UserEntity;

  @Column()
  filename: string;

  @Column()
  url: string; // The R2 URL or key

  @Column({ nullable: true })
  filetype: string;

  @Column({ nullable: true })
  filesize: number;

  @CreateDateColumn()
  uploadedAt: Date;

  // Add more metadata fields as needed
}
