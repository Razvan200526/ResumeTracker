import type { SVGProps } from 'react';

export const PdfIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      >
        <path
          d="M4 9H11V2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="butt"
          strokeWidth="2"
        />
        <path
          d="M4 11V9.07843C4 8.54799 4.21071 8.03929 4.58579 7.66421L9.66421 2.58579C10.0393 2.21071 10.548 2 11.0784 2H18C19.1046 2 20 2.89543 20 4V11"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M2 22V15H4.5C5.88071 15 7 16.1193 7 17.5V17.5C7 18.8807 5.88071 20 4.5 20H2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M10 15V22H11.5C13.433 22 15 20.433 15 18.5C15 16.567 13.433 15 11.5 15H10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M18 22L18 15H22M21 18.5H18.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
