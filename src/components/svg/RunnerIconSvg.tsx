import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const RunnerManSvg = ({ color = '#fff', width = 24, height = 24 }) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    strokeWidth={1.5}
    color={color}
    viewBox="0 0 24 24"
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12.613 8.267l-3.308 4.135 4.135 4.135-2.067 4.55"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m6.41 9.508 3.387-3.309 2.816 2.068 2.895 3.308h3.722M8.892 15.71l-1.241.827H4.343"
    />
  </Svg>
);
