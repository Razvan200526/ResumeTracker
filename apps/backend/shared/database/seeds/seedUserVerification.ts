import type { UserEntity } from '@backend/user/entities/UserEntity';
import { UserVerificationEntity } from '@backend/user/entities/UserVerificationEntity';
import { random } from '@common/utils';
import { primaryDatabase } from '../PrimaryDatabase';

export async function seedUserVerification(user: UserEntity) {
  const userVerificationRepo = await primaryDatabase.open(
    UserVerificationEntity,
  );

  const userVerification = userVerificationRepo.create({
    id: random.nanoid(15),
    user: user,
    identifier: 'email',
    value: user.email,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1h from now
  });
  try {
    await userVerificationRepo.save(userVerification);
  } catch (e) {
    console.error(e);
  }
  return userVerification;
}
