import type { UserEntity } from '@backend/entities/UserEntity';
import { ResumeEntity } from '@backend/resources/resumes/ResumeEntity';
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
  try {
    await Promise.all(resumePromises);
  } catch (e) {
    console.error(e);
  }
}
