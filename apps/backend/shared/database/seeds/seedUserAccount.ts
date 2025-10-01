import { UserAccountEntity } from '@backend/user/entities/UserAccountEntity';
import type { UserEntity } from '@backend/user/entities/UserEntity';
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
  await userAccountRepo.save(userAccount);
  // biome-ignore lint/suspicious/noConsole: <local development>
  console.log('Seeded user account for:', user.email);
  return userAccount;
}
