import * as Colors from '@/constants/Colors';
import { Pressable, StyleSheet, TextProps } from 'react-native';
import { Heading } from '../Text';

interface SelectableButtonProps {
  isSelected: boolean;
  onPress: () => void;
  children: TextProps['children'];
}

export const SelectableButton = ({
  isSelected,
  onPress,
  children,
}: SelectableButtonProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          borderColor: isSelected ? Colors.celestialBlue : Colors.paynesGrey,
          backgroundColor: isSelected ? Colors.electricBlue : 'transparent',
        },
      ]}
      onPress={onPress}
    >
      <Heading style={{ opacity: isSelected ? 1 : 0.5 }}>{children}</Heading>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 54,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
