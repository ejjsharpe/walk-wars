import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const AvatarPlaceholderSvg = ({ height = 164, width = 164 }) => (
  <Svg width={height} height={width} fill="none">
    <Path fill="#B2B7BB" d="M0 0h164v164H0z" />
    <Circle cx={82} cy={62} r={30} fill="#fff" />
    <Path
      fill="#fff"
      d="M41.005 118.26c.887-8.115 7.741-14.26 15.905-14.26h52.012c8.273 0 15.183 6.308 15.934 14.547L129 164H36l5.005-45.74Z"
    />
  </Svg>
);
