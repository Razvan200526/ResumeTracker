import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

export const FolderIcon = ({ title = 'badge 13', ...props }: IconProps) => {
  return (
    <svg
      height="32"
      width="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <g fill="currentColor">
        <path
          d="M5 3C2.79086 3 1 4.79086 1 7V24C1 26.2091 2.79086 28 5 28H27C29.2091 28 31 26.2091 31 24V11C31 8.79086 29.2091 7 27 7H17.8L13.6 3H5Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
