import { Card } from '@common/components/card';
import { H6 } from '@common/components/typography';
import { CreateResumeButton } from './CreateResumeButton';

export const CreateResumeCard = () => {
  return (
    <Card className="rounded border-resume/10 bg-resume/5 flex flex-col gap-4">
      <H6 className="text-resume">Create resume</H6>
      <div className="h-[150px] flex flex-row flex-wrap items-center justify-center gap-2">
        <CreateResumeButton />
      </div>
    </Card>
  );
};
