import { ScrollShadow } from '@heroui/react';
import { mockResumes } from './fakedata';
import { ResumeCard } from './ResumeCard';

export const ResumePage = () => {
  return (
    <ScrollShadow
      size={8}
      className="p-4 bg-background h-full overflow-y-scroll"
    >
      <div className="grid grid-cols-4 gap-4">
        {mockResumes.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </div>
    </ScrollShadow>
  );
};
