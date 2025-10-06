import { UserAccountEntity } from '@backend/entities/UserAccountEntity';
import type { UserEntity } from '@backend/entities/UserEntity';
import { random } from '@common/utils';
import { hashPassword } from 'better-auth/crypto';
import { primaryDatabase } from '../PrimaryDatabase';

export async function seedUserAccount(user: UserEntity) {
  const userAccountRepo = await primaryDatabase.open(UserAccountEntity);

  const hashedPassword = await hashPassword('Password123!');

  const userAccount = userAccountRepo.create({
    id: random.nanoid(15),
    user: user,
    providerId: 'credential',
    accountId: user.email,
    password: hashedPassword,
  });
  try {
    await userAccountRepo.save(userAccount);
  } catch (e) {
    console.error(e);
  }
  return userAccount;
}
