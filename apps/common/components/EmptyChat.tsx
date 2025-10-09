import { MessageIcon } from '@common/icons/MessageIcon';
import { H6 } from './typography';

export const EmptyChat = ({ classname = '' }: { classname: string }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex-col items-center">
        <MessageIcon className={`size-8 ${classname}`} />
        <H6 className={`${classname}`}>Chat about your cover letter</H6>
      </div>
    </div>
  );
};
