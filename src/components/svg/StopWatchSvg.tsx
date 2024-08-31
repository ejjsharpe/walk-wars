import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const StopWatchSvg = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.5 2.333h7M14 11.666v4.667M14 25.667A9.333 9.333 0 1 0 14 7a9.333 9.333 0 0 0 0 18.667Z"
    />
  </Svg>
);
