"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { HeroNavbar } from "./components/HeroNavbar";
import { Button } from "@common/components/button";
import { Link } from "react-router";
import { H1 } from "@common/components/typography";

export const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export const HeroPage = () => {
  return (
    <div
      style={{
        background: "radial-gradient(at center center, #844ed9, #221239)",
      }}
      className=" dark:bg-gray-900 h-[calc(100dvh)] overflow-y-scroll"
    >
      <header className="sticky inset-x-0 top-0 z-50">
        <HeroNavbar />
      </header>

      <div className="py-24 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_both]">
            <H1 className="text-5xl font-primary font-bold tracking-tight text-balance text-light-300 sm:text-7xl dark:text-light">
              The way to up your resume{" "}
              <span className="text-secondary">game</span>
            </H1>
            <p className="mt-8 text-lg font-primary text-pretty text-light sm:text-xl/8 dark:text-gray-400">
              Analize,review, and optimize your resume to stand out in the job
              market.
            </p>
            <div className="flex items-centert justify-center gap-2">
              <Button
                size="lg"
                color="secondary"
                variant="solid"
                className="rounded-3xl mt-10 flex items-center justify-center gap-x-6"
              >
                <Link
                  to="/"
                  className="px-3.5 py-2.5 text-sm font-primary text-hero  dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500"
                >
                  Get started
                </Link>
              </Button>
              <Button
                size="lg"
                className="rounded-3xl mt-10 flex items-center justify-center gap-x-6 bg-hero"
              >
                <Link
                  to="/"
                  className="text-sm/6 px-3.5 py-2.5 font-primary text-light dark:text-light flex items-center gap-1"
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
            className="mt-16 rounded-md bg-light/5 shadow-2xl ring-1 ring-light/10 not-dark:hidden sm:mt-24  opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_both]"
          />
        </div>
      </div>
    </div>
  );
};
