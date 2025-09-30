import { H6 } from '@common/components/typography';
import { ResumeIcon } from '@common/icons/ResumeIcon';
import { CreateResumeButton } from './CreateResumeButton';

export const NoResumes = () => {
  return (
    <div className="h-[calc(100dvh-7rem)] m-4">
      <div className="flex items-center justify-center h-full border border-border rounded">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center">
            <ResumeIcon className="size-7 m-2 text-primary" />
            <H6>Get started by adding your first resume!</H6>
          </div>
          <CreateResumeButton />
        </div>
      </div>
    </div>
  );
};
