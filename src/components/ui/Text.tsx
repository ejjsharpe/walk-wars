import { white } from '@/constants/Colors';
import { Nikeflix, PatrickHandSC } from '@/constants/Fonts';
import { Text as RNText, type TextProps } from 'react-native';

export function Text(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: PatrickHandSC,
          color: white,
          fontSize: 20,
          lineHeight: 20,
        },
        props.style,
      ]}
    />
  );
}

export function Heading(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: Nikeflix,
          color: white,
          fontSize: 28,
          lineHeight: 28,
        },
        props.style,
      ]}
    />
  );
}
