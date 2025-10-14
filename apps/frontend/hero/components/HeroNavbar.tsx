import { Link } from '@common/components/Link';
import { H6 } from '@common/components/typography';
import { Logo } from '@common/icons/Logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
export const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export const HeroNavbar = () => {
  return (
    <nav
      aria-label="Global"
      className="rounded flex items-center justify-between p-3 lg:px-8"
    >
      <div className="flex lg:flex-1">
        <div className="flex items-center gap-2">
          <Logo className="text-secondary size-8" />
          <H6 className="text-2xl font-title text-light">ResAI</H6>
        </div>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <Link
            className="text-light-100 font-semibold"
            key={item.name}
            to={item.href}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link to="/signin" className="flex items-center gap-2">
          <H6 className="text-light">Sign In</H6>
          <ArrowRightIcon color="#f89880" className="size-3.5" />
        </Link>
      </div>
    </nav>
  );
};
