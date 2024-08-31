import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const GoogleGSvg = (props: SvgProps): JSX.Element => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path fill="#fff" d="M0 0h24v24H0z" />
    <Path
      fill="#4285F4"
      fillRule="evenodd"
      d="M23.04 12.261c0-.815-.073-1.6-.21-2.352H12v4.449h6.19a5.29 5.29 0 0 1-2.296 3.47v2.886h3.717c2.174-2.002 3.429-4.95 3.429-8.452Z"
      clipRule="evenodd"
    />
    <Path
      fill="#34A853"
      fillRule="evenodd"
      d="M12 23.5c3.105 0 5.708-1.03 7.61-2.786l-3.716-2.886c-1.03.69-2.347 1.098-3.894 1.098-2.995 0-5.53-2.023-6.435-4.74H1.723v2.979A11.496 11.496 0 0 0 12 23.5Z"
      clipRule="evenodd"
    />
    <Path
      fill="#FBBC05"
      fillRule="evenodd"
      d="M5.565 14.185A6.913 6.913 0 0 1 5.205 12c0-.758.13-1.495.36-2.185v-2.98H1.723A11.495 11.495 0 0 0 .5 12c0 1.856.444 3.612 1.223 5.165l3.842-2.98Z"
      clipRule="evenodd"
    />
    <Path
      fill="#EA4335"
      fillRule="evenodd"
      d="M12 5.074c1.688 0 3.204.58 4.396 1.72l3.299-3.299C17.703 1.64 15.1.5 12 .5A11.496 11.496 0 0 0 1.723 6.835l3.842 2.98C6.47 7.097 9.005 5.074 12 5.074Z"
      clipRule="evenodd"
    />
  </Svg>
);
