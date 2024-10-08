import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CloudSyncIconSvg = ({
  color = '#fff',
  width = 40,
  height = 40,
}) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    strokeWidth={1.5}
    color={color}
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 17.607c1.494-.585 3-1.918 3-4.607 0-4-3.333-5-5-5 0-2 0-6-6-6S6 6 6 8c-1.667 0-5 1-5 5 0 2.689 1.506 4.022 3 4.607M7.58 19.487l1.768 1.768a4 4 0 0 0 5.657 0l.354-.353"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m7.934 21.962-.353-2.475 2.474.354-2.12 2.121ZM16.298 16.902l-1.768-1.768a4 4 0 0 0-5.657 0l-.353.353"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15.944 14.427.354 2.475-2.475-.354 2.121-2.121Z"
    />
  </Svg>
);
