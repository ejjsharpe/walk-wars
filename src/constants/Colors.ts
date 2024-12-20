import { Theme, DefaultTheme as _DefaultTheme } from '@react-navigation/native';

export const pictonBlue = '#38B3F8';
export const pumpkinOrange = '#F87D38';
export const pumpkinOrangeDark = '#B95720';
export const squidInkNavy = '#1C2835';
export const squidInkLight = '#171F27';
export const white = '#FFFFFF';
export const electricBlue = '#005484';
export const celestialBlue = '#00A3FF';
export const transparent = 'transparent';
export const paynesGrey = '#525E6A';

export const primaryButton = pictonBlue;
export const primaryButtonPressed = '#297DAD';

export const backButton = pumpkinOrange;
export const backButtonPressed = pumpkinOrangeDark;

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
