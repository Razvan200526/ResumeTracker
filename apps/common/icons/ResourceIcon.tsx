import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  secondaryfill?: string;
  strokewidth?: number;
  title?: string;
};

export const ResourceIcon = ({ title = 'badge 13', ...props }: IconProps) => {
  return (
    <svg
      height="48"
      width="48"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>
      <g fill="#212121" strokeLinecap="butt" strokeLinejoin="miter">
        <path
          d="M36.0011 45C38.7626 45 41 42.7626 41 40.0012C41 30.0149 41 17.9851 41 7.99883C41 5.2374 38.7614 3 36 3H20.2426C19.447 3 18.6839 3.31607 18.1213 3.87868L7.87868 14.1213C7.31607 14.6839 7 15.447 7 16.2426C7 24.1618 7.00001 32.0809 7.00001 40C7 42.7614 9.23744 45 11.9989 45C19.4778 45 28.5222 45 36.0011 45Z"
          fill="none"
          stroke="#212121"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M20 3V16H7"
          fill="none"
          stroke="#212121"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M14 24H34"
          fill="none"
          stroke="#212121"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M34 16H27"
          fill="none"
          stroke="#212121"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="M14 32H34"
          fill="none"
          stroke="#212121"
          strokeLinecap="square"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
