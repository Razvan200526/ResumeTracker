import { primaryDatabase } from './PrimaryDatabase';
import { seedResume } from './seeds/seedResume';
import { seedUser } from './seeds/seedUser';
import { seedUserAccount } from './seeds/seedUserAccount';
import { seedUserSession } from './seeds/seedUserSession';
import { seedUserVerification } from './seeds/seedUserVerification';

async function seed() {
  // Initialize the database connection and synchronize the schema once.
  const source = primaryDatabase.getSource();
  if (!source.isInitialized) {
    await source.initialize();
  }

  const seedPromises = [];
  for (let i = 1; i <= 20; i++) {
    seedPromises.push(
      (async () => {
        const user = await seedUser(i);
        await Promise.all([
          seedUserAccount(user),
          seedUserSession(user),
          seedUserVerification(user),
          seedResume(user),
        ]);
      })(),
    );
  }

  await Promise.all(seedPromises);

  await primaryDatabase.close();
}

seed()
  .then(() => {
    // biome-ignore lint/suspicious/noConsole: <local development>
    console.log('Seeding complete!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
