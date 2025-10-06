import {
  UserAccountEntity,
  UserEntity,
  UserSessionEntity,
  UserVerificationEntity,
} from '@backend/entities';
import { CoverletterEntity } from '@backend/resources/cover-letters/CoverletterEntity';
import { ResumeEntity } from '@backend/resources/resumes/ResumeEntity';

export const PrimaryEntities = [
  UserEntity,
  UserAccountEntity,
  UserSessionEntity,
  UserVerificationEntity,
  ResumeEntity,
  CoverletterEntity,
];
