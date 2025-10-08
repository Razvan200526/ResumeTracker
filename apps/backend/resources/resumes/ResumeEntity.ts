import type { UserEntity } from '@backend/entities';
import { random } from '@common/utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('resumes')
export class ResumeEntity {
  @PrimaryColumn()
  id: string = random.nanoid(15);

  @ManyToOne('UserEntity', 'resumes')
  user: UserEntity;

  @Column({ nullable: true })
  name: string;

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
