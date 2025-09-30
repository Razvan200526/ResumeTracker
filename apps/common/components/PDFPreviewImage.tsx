import { PdfIcon } from '@common/icons/PdfIcon';
import { Image } from '@heroui/react';
import { getDocument } from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';

export const PdfPreviewImage = ({ src }: { src: string }) => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!src) return;

    async function renderFirstPage() {
      const loadingTask = getDocument(src);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const scale = 2;
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;

      // @ts-ignore: trust me
      canvas.width = viewport.width;
      // @ts-ignore: trust me
      canvas.height = viewport.height;

      // @ts-ignore: trust me
      const context = canvas.getContext('2d');
      await page.render({ canvasContext: context, viewport }).promise;

      // @ts-ignore: trust me
      const dataUrl = canvas.toDataURL('image/png');
      setImageUrl(dataUrl);
    }

    renderFirstPage();
  }, [src]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {imageUrl ? (
        <Image
          src={imageUrl}
          className="max-h-full max-w-full object-contain"
          classNames={{
            wrapper: 'h-full w-full flex items-center justify-center',
            img: 'max-h-full max-w-full object-contain',
          }}
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <PdfIcon className="size-10 text-primary-300" />
        </div>
      )}
    </>
  );
};
