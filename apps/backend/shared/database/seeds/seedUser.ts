import { UserEntity } from '@backend/user/entities/UserEntity';
import { random } from '@common/utils';
import { primaryDatabase } from '../PrimaryDatabase';

export async function seedUser(index: number) {
  const userRepo = await primaryDatabase.open(UserEntity);

  const email = `testuser${index}@example.com`;
  const user = userRepo.create({
    id: random.nanoid(15),
    email: email,
    name: `Test User ${index}`,
    firstName: 'Test',
    lastName: `User${index}`,
    isEmailVerified: true,
  });
  await userRepo.save(user);
  // biome-ignore lint/suspicious/noConsole: <local development>
  console.log('Seeded user:', user.email);
  return user;
}
