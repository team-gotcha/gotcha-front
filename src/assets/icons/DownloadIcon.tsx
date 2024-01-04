import * as React from 'react';
const DownloadIcon = (props: any) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_1319_27083"
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
    <g mask="url(#mask0_1319_27083)">
      <path
        d="M4.5 20.5V19H19.5V20.5H4.5ZM12 16.6538L7.34615 12L8.39997 10.9462L11.25 13.7962V3.50003H12.7499V13.7962L15.6 10.9462L16.6538 12L12 16.6538Z"
        fill="#1A1A1A"
      />
    </g>
  </svg>
);
export default DownloadIcon;
