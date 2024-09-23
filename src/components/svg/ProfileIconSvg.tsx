import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ProfileIconSvg = ({ width = 36, height = 36, color = '#fff' }) => (
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
      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
);
