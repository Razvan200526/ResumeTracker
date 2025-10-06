import { useAuth } from '@frontend/shared/hooks';
import { ScrollShadow } from '@heroui/react';
import type { CoverLetterType } from '@sdk/types';
import { useCoverLetters } from '../resumes/hooks';
import { CoverLetterCard } from './CoverLetterCard';
import { NoCoverLetters } from './NoCoverLetters';

export const CoverLettersPage = () => {
  const { data: user } = useAuth();
  const {
    data: coverLetters,
    isLoading: coverLettersLoading,
    error,
  } = useCoverLetters(user ? user.id : '');
  if (coverLettersLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cover letters</div>;
  if (!coverLetters || coverLetters.length === 0) {
    return <NoCoverLetters />;
  }
  return (
    <ScrollShadow
      size={8}
      className="p-4 bg-background h-full overflow-y-scroll"
    >
      <div className="grid grid-cols-3 gap-4">
        {coverLetters?.map((coverLetter: CoverLetterType) => (
          <CoverLetterCard key={coverLetter.id} coverLetter={coverLetter} />
        ))}
      </div>
    </ScrollShadow>
  );
};
