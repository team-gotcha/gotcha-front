import * as React from "react";
const BoardIcon = (props: any) => (
  <svg
    width="current"
    height="current"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_1319_27211"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <rect width={24} height={24} fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_1319_27211)">
      <path
        d="M5 5H11.2222V11.2222H5V5ZM12.7778 5H19V11.2222H12.7778V5ZM5 12.7778H11.2222V19H5V12.7778ZM15.1111 12.7778H16.6667V15.1111H19V16.6667H16.6667V19H15.1111V16.6667H12.7778V15.1111H15.1111V12.7778ZM14.3333 6.55556V9.66667H17.4444V6.55556H14.3333ZM6.55556 6.55556V9.66667H9.66667V6.55556H6.55556ZM6.55556 14.3333V17.4444H9.66667V14.3333H6.55556Z"
        fill="current"
      />
    </g>
  </svg>
);
export default BoardIcon;
