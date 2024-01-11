import * as React from 'react';
const CheckIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={18}
    viewBox="0 0 21 18"
    fill="none"
    {...props}
  >
    <path
      d="M2 8.84444L7.75 16L19 2"
      stroke="url(#paint0_linear_794_7973)"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_794_7973"
        x1={-1.09091}
        y1={19.7059}
        x2={21.8984}
        y2={8.54841}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0085FF" />
        <stop offset={1} stopColor="#7635FF" />
      </linearGradient>
    </defs>
  </svg>
);
export default CheckIcon;
