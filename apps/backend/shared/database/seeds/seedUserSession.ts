import { type UserEntity, UserSessionEntity } from '@backend/entities';
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
  try {
    await userSessionRepo.save(userSession);
  } catch (e) {
    console.error(e);
  }
  return userSession;
}
