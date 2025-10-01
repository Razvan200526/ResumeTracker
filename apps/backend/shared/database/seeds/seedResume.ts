import { ResumeEntity } from '@backend/resources/resumes/ResumeEntity';
import type { UserEntity } from '@backend/user/entities/UserEntity';
import { primaryDatabase } from '../PrimaryDatabase';

export async function seedResume(user: UserEntity) {
  const resumeRepo = await primaryDatabase.open(ResumeEntity);
  const resumePromises = [];

  for (let i = 1; i <= 20; i++) {
    const resume = resumeRepo.create({
      user: user,
      filename: `resume_${i}.pdf`,
      url: `https://example.com/resume_${i}.pdf`,
      filetype: 'application/pdf',
      filesize: 123456 + i,
    });
    resumePromises.push(resumeRepo.save(resume));
  }

  await Promise.all(resumePromises);
  // biome-ignore lint/suspicious/noConsole: <local development>
  console.log(`Seeded 20 resumes for: ${user.email}`);
}
