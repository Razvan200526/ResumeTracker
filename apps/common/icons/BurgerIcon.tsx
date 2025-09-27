import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

export const BurgerIcon = ({ title = 'badge 13', ...props }: IconProps) => {
  return (
    <svg
      height="32"
      width="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <g fill="#212121" strokeLinecap="butt" strokeLinejoin="miter">
        <line
          fill="none"
          stroke="#212121"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="2"
          x2="30"
          y1="16"
          y2="16"
        />
        <line
          fill="none"
          stroke="#212121"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="2"
          x2="30"
          y1="7"
          y2="7"
        />
        <line
          fill="none"
          stroke="#212121"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="2"
          x2="30"
          y1="25"
          y2="25"
        />
      </g>
    </svg>
  );
};
