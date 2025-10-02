import { Button } from '@common/components/button';
import { Modal, type ModalRefType } from '@common/components/Modal';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';
import { CreateResumeCard } from './CreateResumeCard';

export const CreateResourceModal = () => {
  const ref = useRef<ModalRefType | null>(null);

  return (
    <>
      <Button
        variant="light"
        isIconOnly={true}
        radius="full"
        onPress={() => ref.current?.open()}
      >
        <PlusIcon className="size-4" />
      </Button>

      <Modal
        size={'5xl'}
        className="bg-light rounded"
        modalRef={ref}
        hideCloseButton={true}
      >
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CreateResumeCard />
        </div>
      </Modal>
    </>
  );
};
