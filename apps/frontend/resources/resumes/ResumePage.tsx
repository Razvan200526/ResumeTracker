import { useAuth } from '@frontend/shared/hooks';
import { ScrollShadow } from '@heroui/react';
import type { ResumeType } from '@sdk/types';
import { Link } from 'react-router';
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
      className="m-4 bg-background h-full overflow-y-scroll border border-border rounded"
    >
      <div className="p-4 grid grid-cols-6 gap-4">
        {resumes.map((resume: ResumeType) => (
          <Link to={`/home/resources/resumes/${resume.id}`} key={resume.id}>
            <ResumeCard resume={resume} />
          </Link>
        ))}
      </div>
    </ScrollShadow>
  );
};
