import { PDFPreviewSkeleton } from '@common/components/PDFSkeletion';
import { PdfViewer } from '@common/components/PDFViewer';
import { PageLoader } from '@frontend/shared/components/PageLoader';
import { useAuth } from '@frontend/shared/hooks';
import { useGetCoverLetter } from '../resumes/hooks';
import { CoverLetterChat } from './CoverLetterChat';
import { NoCoverLetters } from './NoCoverLetters';

export const CoverLetterInspectPage = () => {
  const { data: user } = useAuth();
  const {
    data: coverLetterData,
    isFetching,
    isError,
  } = useGetCoverLetter(user?.id || '');

  if (isFetching) return <PageLoader />;
  if (isError) {
    throw Error('There was an error');
  }
  if (!coverLetterData) {
    return <NoCoverLetters />;
  }
  return (
    <div className="m-4 border border-border rounded h-[calc(100dvh-7rem)] flex flex-row">
      <div className="m-4 rounded-xl flex-1 border border-coverletter/20">
        {!isFetching ? (
          <PdfViewer toolbar={true} src={coverLetterData.url} initialPage={0} />
        ) : (
          <PDFPreviewSkeleton />
        )}
      </div>
      <div className="m-4 flex-1">
        <CoverLetterChat coverletter={coverLetterData} />
      </div>
    </div>
  );
};
