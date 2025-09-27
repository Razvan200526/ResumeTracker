import { Link } from 'react-router';
import { AcmeIcon } from './AcmeIcon';

export const HeaderMinimize = () => {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="bg-foreground flex h-8 w-8 items-center justify-center rounded-full">
        <Link to={'/'}>
          <AcmeIcon />
        </Link>
      </div>
    </div>
  );
};
