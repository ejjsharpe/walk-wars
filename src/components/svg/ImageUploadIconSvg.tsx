import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ImageUploadIconSvg = ({ size = 36 }) => (
  <Svg width={size} height={size} fill="none">
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="M19.5 31.5H5.4a.9.9 0 0 1-.9-.9V5.4a.9.9 0 0 1 .9-.9h25.2a.9.9 0 0 1 .9.9v14.1"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="M4.5 24 15 19.5l8.25 3.75M24 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM24 28.5h4.5m0 0H33m-4.5 0V24m0 4.5V33"
    />
  </Svg>
);
