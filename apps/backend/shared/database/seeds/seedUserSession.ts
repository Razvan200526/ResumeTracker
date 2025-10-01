import type { UserEntity } from '@backend/user/entities/UserEntity';
import { UserSessionEntity } from '@backend/user/entities/UserSessionEntity';
import { random } from '@common/utils';
import { primaryDatabase } from '../PrimaryDatabase';

export async function seedUserSession(user: UserEntity) {
  const userSessionRepo = await primaryDatabase.open(UserSessionEntity);

  const userSession = userSessionRepo.create({
    id: random.nanoid(15),
    user: user,
    token: random.nanoid(32),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h from now
    ipAddress: '127.0.0.1',
    userAgent: 'seed-script',
  });
  await userSessionRepo.save(userSession);
  // biome-ignore lint/suspicious/noConsole: <local development>
  console.log('Seeded user session for:', user.email);
  return userSession;
}
