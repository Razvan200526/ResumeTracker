import { Button } from '@common/components/button';
import { Modal, type ModalRefType } from '@common/components/Modal';
import { PdfUploader } from '@common/components/PdfUploader';
import { ResumeIcon } from '@common/icons/ResumeIcon';
import { backend } from '@frontend/shared/backend';
import { useRef } from 'react';

export const CreateResumeButton = () => {
  const modalRef = useRef<ModalRefType>(null);

  const createResume = async (urls: string[]) => {
    backend.resume.create({
      url: urls[0],
    });

    modalRef.current?.close();
  };

  return (
    <>
      <Button
        color="primary"
        className="bg-resume"
        size="sm"
        startContent={<ResumeIcon className="size-3.5" />}
        onPress={() => modalRef.current?.open()}
      >
        Add resume
      </Button>
      <Modal
        modalRef={modalRef}
        isDismissable={true}
        isKeyboardDismissDisabled={false}
        hideCloseButton={true}
        className="bg-light p-4 rounded"
      >
        <PdfUploader
          type="resume"
          onUpload={async (urls) => await createResume(urls)}
        />
      </Modal>
    </>
  );
};
