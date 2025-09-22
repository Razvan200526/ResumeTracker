import { Link } from "@common/components/Link";
import { H6 } from "@common/components/typography";
import { Logo } from "@common/icons/Logo";
import { ArrowRightIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Link as NavLink } from "react-router";
import { useState } from "react";
export const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export const HeroNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      aria-label="Global"
      className="rounded flex items-center justify-between p-3 lg:px-8"
    >
      <div className="flex lg:flex-1">
        <div className="flex items-center">
          <Logo />
          <H6 className="text-2xl font-title text-light">ResAI</H6>
        </div>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-500 dark:text-gray-400"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
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
        <Link to="/login" className="flex items-center gap-2">
          <H6 className="text-light">Log In</H6>
          <ArrowRightIcon color="#f89880" className="size-3.5" />
        </Link>
      </div>
    </nav>
  );
};
