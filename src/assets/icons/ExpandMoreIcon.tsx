import * as React from 'react';
const ExpandMoreIcon = (props: any) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_1319_27085"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <rect width={24} height={24} fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_1319_27085)">
      <path
        d="M12 15.375L6 9.37501L7.4 7.97501L12 12.575L16.6 7.97501L18 9.37501L12 15.375Z"
        fill="#1A1A1A"
      />
    </g>
  </svg>
);
export default ExpandMoreIcon;
