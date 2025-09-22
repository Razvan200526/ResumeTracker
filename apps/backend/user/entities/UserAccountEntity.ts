import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  type Relation,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({
  name: "user_accounts",
})
export class UserAccountEntity {
  @PrimaryColumn({ name: "id", type: "varchar", length: 15 })
  id: string = crypto.randomUUID();

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: Relation<UserEntity>;

  @Column({ name: "provider_id", type: "varchar", length: 50 })
  providerId: string; // e.g., 'google', 'github', 'discord', 'credential'

  @Column({ name: "account_id", type: "varchar", length: 255 })
  accountId: string;

  @Column({ name: "password", type: "varchar", length: 255, nullable: true })
  password?: string; // Used for credential provider (email/password)

  @Column({ name: "access_token", type: "text", nullable: true })
  accessToken?: string;

  @Column({
    name: "access_token_expires_at",
    type: "timestamptz",
    nullable: true,
  })
  accessTokenExpiresAt?: Date;

  @Column({ name: "refresh_token", type: "text", nullable: true })
  refreshToken?: string;

  @Column({
    name: "refresh_token_expires_at",
    type: "timestamptz",
    nullable: true,
  })
  refreshTokenExpiresAt?: Date;

  @Column({ name: "expires_at", type: "timestamptz", nullable: true })
  expiresAt?: Date;

  @Column({ name: "scope", type: "text", nullable: true })
  scope?: string; // OAuth scopes granted

  @Column({ name: "id_token", type: "text", nullable: true })
  idToken?: string; // OpenID Connect ID token

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz", nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true })
  deletedAt?: Date | null;
}
