import { Card } from '@common/components/card';
import { PdfPreviewImage } from '@common/components/PDFPreviewImage';
import { Checkbox } from '@heroui/react';
import type { CoverLetterType } from '@sdk/types';
import { useDeleteStore } from '../store';

type CoverLetterCardProps = {
  coverLetter: CoverLetterType;
};

export const CoverLetterCard = ({ coverLetter }: CoverLetterCardProps) => {
  const { state, addToDeleteCoverletters, removeFromDeleteCoverletters } =
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
                addToDeleteCoverletters(coverLetter.id);
              } else {
                removeFromDeleteCoverletters(coverLetter.id);
              }
            }}
          />
        )}
        <PdfPreviewImage src={coverLetter.url} />
      </div>
    </Card>
  );
};
