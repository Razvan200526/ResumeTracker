import { UserEntity } from '@backend/entities/UserEntity';
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
  try {
    await userRepo.save(user);
  } catch (e) {
    console.error(e);
  }
  return user;
}
