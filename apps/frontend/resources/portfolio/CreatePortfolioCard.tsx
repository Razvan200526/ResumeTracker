import { Card } from '@common/components/card';
import { H6 } from '@common/components/typography';
import { CreatePortfolioButton } from './CreatePortfolioButton';

export const CreatePortfolioCard = () => {
  return (
    <Card className="rounded border-portfolio/10 bg-portfolio/5 h-full flex flex-col">
      <div className="flex items-center justify-center">
        <div className="h-[150px] flex flex-col items-center justify-center">
          <H6 className="text-portfolio p-4">
            Create or upload a cover letter
          </H6>
          <CreatePortfolioButton />
        </div>
      </div>
    </Card>
  );
};
