import { cn, Link as HeroLink, type LinkProps } from '@heroui/react';
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from 'react-router';

export const ExternalLink = (props: LinkProps) => {
  return (
    <HeroLink {...props} color="secondary">
      {props.children}
    </HeroLink>
  );
};

export const Link = (props: RouterLinkProps) => {
  return (
    <RouterLink
      {...props}
      className={cn(
        'cursor-pointer select-none tracking-wide text-primary decoration-none underline-offset-4 outline-0 disabled:cursor-not-allowed disabled:opacity-50',
        "relative before:content-[''] before:absolute before:block before:w-full before:h-[2px] before:bottom-[-2px] before:left-0",
        'before:scale-x-0 before:bg-secondary-text before:transition-transform before:duration-300 hover:before:scale-x-100',
        'font-medium',
        props.className,
      )}
    >
      {props.children}
    </RouterLink>
  );
};
