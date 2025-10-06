import { Card } from '@common/components/card';
import { PdfPreviewImage } from '@common/components/PDFPreviewImage';
import { Checkbox } from '@heroui/react';
import type { ResumeType } from '@sdk/types';
import { useDeleteStore } from '../store';

type ResumeCardProps = {
  resume: ResumeType;
};
export const ResumeCard = ({ resume }: ResumeCardProps) => {
  const { state, addToDeleteResumes, removeFromDeleteResumes } =
    useDeleteStore();
  return (
    <Card className="relative flex flex-col hover:border-book w-full gap-4">
      <div className="h-[250px] w-full border border-border-hover rounded p-2 flex items-center justify-center">
        {state && (
          <Checkbox
            className="absolute top-7 right-5 z-10"
            color="danger"
            onValueChange={(isSelected) => {
              if (isSelected) {
                addToDeleteResumes(resume.id);
              } else {
                removeFromDeleteResumes(resume.id);
              }
            }}
          />
        )}
        <PdfPreviewImage src={resume.url} />
      </div>
    </Card>
  );
};
