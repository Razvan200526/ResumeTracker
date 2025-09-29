import { ScrollShadow } from '@heroui/react';
import { mockResumes } from './fakedata';
import { ResumeCard } from './ResumeCard';

export const ResumePage = () => {
  return (
    <ScrollShadow
      size={8}
      className="p-4 h-full overflow-y-scroll bg-background"
    >
      <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 w-full">
        {mockResumes?.map((resume) => (
          <li key={resume.id} className="flex w-full">
            <ResumeCard resume={resume} />
          </li>
        ))}
      </ul>
    </ScrollShadow>
  );
};
