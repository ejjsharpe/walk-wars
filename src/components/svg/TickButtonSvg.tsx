import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const TickButtonSvg = (props: SvgProps) => (
  <Svg width={48} height={48} fill="none" {...props}>
    <Path fill="#fff" d="M9.6 9.6h27.6V36H9.6V9.6Z" />
    <Path
      fill="#38B3F8"
      fillRule="evenodd"
      d="M24 2.5C12.126 2.5 2.5 12.126 2.5 24S12.126 45.5 24 45.5 45.5 35.874 45.5 24 35.874 2.5 24 2.5Zm-8.94 21.44a1.5 1.5 0 0 0-2.12 2.12l6 6a1.5 1.5 0 0 0 2.12 0l14-14a1.5 1.5 0 0 0-2.12-2.12L20 28.878l-4.94-4.94Z"
      clipRule="evenodd"
    />
  </Svg>
);
