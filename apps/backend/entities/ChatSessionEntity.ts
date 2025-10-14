import { random } from '@common/utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatMessageEntity } from './ChatMessageEntity';
import { UserEntity } from './UserEntity';

@Entity('chat_sessions')
export class ChatSessionEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'varchar',
    length: 15,
  })
  id: string = random.nanoid(15);

  @ManyToOne(
    () => UserEntity,
    (user) => user.chatSessions,
  )
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'resource_type' })
  resourceType: 'resume' | 'coverletter';

  @Column({ name: 'resource_id' })
  resourceId: string;

  @Column({ name: 'resource_name' })
  resourceName: string;

  @OneToMany(
    () => ChatMessageEntity,
    (message) => message.chatSession,
  )
  messages: ChatMessageEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt?: Date | null;
}
