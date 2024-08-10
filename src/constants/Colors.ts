import { Theme, DefaultTheme as _DefaultTheme } from '@react-navigation/native';

export const primary = '#38B3F8';
export const secondary = '#F87D38';
export const background = '#213140';
export const card = '#283746';
export const text = '#FFFFFF';
export const selected = '#005484';
export const selectedBorder = '#00A3FF';
export const unselected = 'transparent';
export const unselectedBorder = '#646F79';

export const DefaultTheme: Theme = {
  ..._DefaultTheme,
  dark: true,
  colors: {
    primary,
    background,
    card,
    text,
    border: unselectedBorder,
    notification: secondary,
  },
};
