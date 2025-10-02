import { useAuth } from '@frontend/shared/hooks';
import { ScrollShadow } from '@heroui/react';
import type { ResumeType } from '@sdk/types';
import { useResumes } from './hooks';
import { NoResumes } from './NoResumes';
import { ResumeCard } from './ResumeCard';

export const ResumePage = () => {
  const { data: user } = useAuth();
  const {
    data: resumes,
    isLoading: resumesLoading,
    error,
  } = useResumes(user ? user.id : '');

  if (resumesLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading resumes</div>;
  if (!resumes || resumes.length === 0) {
    return <NoResumes />;
  }
  return (
    <ScrollShadow
      size={8}
      className="p-4 bg-background h-full overflow-y-scroll"
    >
      <div className="grid grid-cols-3 gap-4">
        {resumes.map((resume: ResumeType) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </ScrollShadow>
  );
};
