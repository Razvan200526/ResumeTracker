import { ResumeEntity } from '@backend/resources/resumes/ResumeEntity';
import { storageService } from '@backend/service/StorageService';
import { primaryDatabase } from '@backend/shared/database/PrimaryDatabase';
import type { UserType } from '@sdk/types';

export async function uploadResume({
  resume,
  user,
}: {
  resume: File;
  user: UserType;
}) {
  const url = await storageService.uploadResume(resume);
  const filename = resume.name;
  const filesize = resume.size;

  const repo = await primaryDatabase.open(ResumeEntity);
  const resumeEntity = repo.create({
    user,
    filename,
    url,
    filesize,
  });

  const savedResume = await repo.save(resumeEntity);
  return savedResume ? { url, resume: savedResume } : null;
}
