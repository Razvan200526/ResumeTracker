import { UserAccountEntity } from "@backend/user/entities/UserAccountEntity";
import { UserEntity } from "@backend/user//entities/UserEntity";
import { UserSessionEntity } from "@backend/user/entities/UserSessionEntity";

export const PrimaryEntities = [
  UserEntity,
  UserAccountEntity,
  UserSessionEntity,
];
