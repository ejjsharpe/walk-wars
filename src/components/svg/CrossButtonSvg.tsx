import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const CrossButtonSvg = (props: SvgProps) => (
  <Svg width={48} height={48} fill="none" {...props}>
    <Path fill="#fff" d="M10 11h27.6v26.4H10z" />
    <Path
      fill="#F87D38"
      fillRule="evenodd"
      d="M24 2.5C12.126 2.5 2.5 12.126 2.5 24S12.126 45.5 24 45.5 45.5 35.874 45.5 24 35.874 2.5 24 2.5Zm-4.597 14.782a1.5 1.5 0 1 0-2.121 2.122L21.878 24l-4.596 4.596a1.5 1.5 0 0 0 2.121 2.122L24 26.12l4.597 4.597a1.5 1.5 0 0 0 2.121-2.122L26.121 24l4.596-4.596a1.5 1.5 0 1 0-2.121-2.122l-4.597 4.597-4.596-4.597Z"
      clipRule="evenodd"
    />
  </Svg>
);
