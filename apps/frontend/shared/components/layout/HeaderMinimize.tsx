import { Logo } from '@common/icons/Logo';
import { Link } from 'react-router';

export const HeaderMinimize = () => {
  return (
    <div className="flex items-center gap-2 px-2">
      <div className="bg-light flex h-8 w-8 items-center justify-center rounded-full">
        <Link to={'/'}>
          <Logo className="size-7" color="#97caea" />
        </Link>
      </div>
    </div>
  );
};
