import { Theme, DefaultTheme as _DefaultTheme } from '@react-navigation/native';

export const pictonBlue = '#38B3F8';
export const pumpkinOrange = '#F87D38';
export const pumpkinOrangeDark = '#B95720';
export const squidInkNavy = '#213140';
export const squidInkLight = '#283746';
export const white = '#FFFFFF';
export const electricBlue = '#005484';
export const celestialBlue = '#00A3FF';
export const transparent = 'transparent';
export const paynesGrey = '#525E6A';

export const DefaultTheme: Theme = {
  ..._DefaultTheme,
  dark: true,
  colors: {
    primary: pictonBlue,
    background: squidInkNavy,
    card: squidInkLight,
    text: white,
    border: paynesGrey,
    notification: pumpkinOrange,
  },
};
