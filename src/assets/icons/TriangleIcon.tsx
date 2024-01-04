import * as React from 'react';
const TriangleIcon = (props: any) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_1319_27084"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={20}
      height={20}
    >
      <rect width={20} height={20} fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_1319_27084)">
      <path
        d="M4.00491 15.5833C3.72607 15.5833 3.52789 15.4647 3.41037 15.2275C3.29285 14.9904 3.30673 14.7601 3.45204 14.5368L9.44719 5.61865C9.58394 5.42314 9.76823 5.32538 10.0001 5.32538C10.2319 5.32538 10.4162 5.42314 10.5529 5.61865L16.5481 14.5368C16.6934 14.7601 16.7073 14.9904 16.5897 15.2275C16.4722 15.4647 16.2741 15.5833 15.9952 15.5833H4.00491Z"
        fill="#1A1A1A"
      />
    </g>
  </svg>
);
export default TriangleIcon;
