'use client';

import { Button } from '@common/components/button';
import { H1 } from '@common/components/typography';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';
import { HeroNavbar } from './components/HeroNavbar';

export const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export const HeroPage = () => {
  return (
    <div
      style={{
        background: 'radial-gradient(at center center, #38056d, #6115b4)',
      }}
      className="scrollbar-hide h-[calc(100dvh)] overflow-y-scroll dark:bg-gray-900"
    >
      <header className="sticky inset-x-0 top-0 z-50">
        <HeroNavbar />
      </header>

      <div className="py-24 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl animate-[fadeInUp_1s_ease-out_0.2s_both] text-center opacity-0">
            <H1 className="font-primary text-5xl font-bold tracking-tight text-balance text-light-300 sm:text-7xl dark:text-light">
              The way to up your resume{' '}
              <span className="text-secondary">game</span>
            </H1>
            <p className="mt-8 font-primary text-lg text-pretty text-light sm:text-xl/8 dark:text-gray-400">
              Analize,review, and optimize your resume to stand out in the job
              market.
            </p>
            <div className="items-centert flex justify-center gap-2">
              <Button
                size="lg"
                color="secondary"
                variant="solid"
                className="mt-10 flex items-center justify-center gap-x-6 rounded-3xl"
              >
                <Link
                  to="/signup"
                  className="px-3.5 py-2.5 font-primary text-sm text-light dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500"
                >
                  Get started
                </Link>
              </Button>
              <Button
                size="lg"
                variant="light"
                className="mt-10 flex items-center justify-center gap-x-6 rounded-3xl"
              >
                <Link
                  to="/"
                  className="flex items-center gap-1 px-3.5 py-2.5 font-primary text-sm/6 text-light dark:text-light"
                >
                  Learn More
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
          <img
            alt="App screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            width={2432}
            height={1442}
            className="not-dark:hidden mt-16 animate-[fadeInUp_1s_ease-out_0.2s_both] rounded-md bg-light/5 opacity-0 shadow-2xl ring-1 ring-light/10 sm:mt-24"
          />
        </div>
      </div>
    </div>
  );
};
