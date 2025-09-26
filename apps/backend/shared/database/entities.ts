import { UserEntity } from '@backend/user//entities/UserEntity';
import { UserAccountEntity } from '@backend/user/entities/UserAccountEntity';
import { UserSessionEntity } from '@backend/user/entities/UserSessionEntity';
import { UserVerificationEntity } from '@backend/user/entities/UserVerificationEntity';

export const PrimaryEntities = [
  UserEntity,
  UserAccountEntity,
  UserSessionEntity,
  UserVerificationEntity,
];
