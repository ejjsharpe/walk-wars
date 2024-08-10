import { primary, selected, text } from '@/constants/Colors';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Heading, Text } from './Text';

export function Button({
  children,
  onPress,
}: {
  children: string | React.ReactNode;
  onPress: () => void;
}) {
  const [backgroundColor, setBackgroundColor] = useState(primary);
  return (
    <Pressable
      style={[styles.button, { backgroundColor }]}
      onPressIn={() => {
        setBackgroundColor(selected);
      }}
      onPressOut={() => {
        setBackgroundColor(primary);
      }}
      onPress={onPress}
    >
      <Heading>{children}</Heading>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: primary,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
