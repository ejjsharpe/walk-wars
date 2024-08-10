import { text } from '@/constants/Colors';
import { Nikeflix, PatrickHandSC } from '@/constants/Fonts';
import { Text as RNText, type TextProps } from 'react-native';

export function Text(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: PatrickHandSC,
          color: text,
          fontSize: 20,
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
        props.style,
        {
          fontFamily: Nikeflix,
          color: text,
          fontSize: 28,
          lineHeight: 28,
        },
      ]}
    />
  );
}
