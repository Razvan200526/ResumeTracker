import { Card } from '@common/components/card';
import { PdfPreviewImage } from '@common/components/PDFPreviewImage';
import type { ResumeType } from '@sdk/types';

interface ResumeCardProps {
  resume: ResumeType;
}

export const ResumeCard = ({ resume }: ResumeCardProps) => {
  return (
    <Card className="relative flex flex-col hover:border-book w-full gap-4">
      <div className="h-[250px] w-full border border-border-hover rounded p-2 flex items-center justify-center">
        <PdfPreviewImage src={resume.url} />
      </div>
    </Card>
  );
};
