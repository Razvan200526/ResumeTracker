import type { UserEntity } from '@backend/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('coverletter')
export class CoverletterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('UserEntity', 'coverletter')
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
