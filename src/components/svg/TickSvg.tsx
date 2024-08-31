import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
export const TickSvg = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M6.667 17.334 12 22.666 25.333 9.333"
    />
  </Svg>
);
