import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import type { UserAccountEntity, UserSessionEntity } from "./index";
@Entity({
  name: "users",
})
@Index(["email"], { unique: true })
export class UserEntity {
  @PrimaryColumn({
    name: "id",
    type: "varchar",
  })
  id: string = crypto.randomUUID();

  @Column({ name: "email", type: "varchar", length: 255 })
  email: string;

  @Column({ name: "password", type: "varchar", length: 255 })
  password: string;

  @Column({ name: "name", type: "varchar", length: 200 })
  name: string;

  @Column({ name: "first_name", type: "varchar", length: 100 })
  firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 100 })
  lastName: string;

  @OneToMany("UserSessionEntity", "user")
  sessions: UserSessionEntity[];

  @OneToOne("UserAccountEntity", "user")
  account: UserAccountEntity;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz", nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamptz", nullable: true })
  deletedAt?: Date | null;

  @Column({ name: "locked_at", type: "timestamptz", nullable: true })
  lockedAt?: Date | null;

  @Column({ name: "blocked_at", type: "timestamptz", nullable: true })
  blockedAt?: Date | null;
}
