import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading } from '../Text';
import { Button } from './Button';

interface IconButtonProps extends PropsWithChildren {
  onPress: () => void;
  Icon: JSX.Element;
  backgroundColor: string;
  pressedBackgroundColor: string;
  textColor: string;
}

export const IconButton = ({
  onPress,
  children,
  Icon,
  backgroundColor,
  pressedBackgroundColor,
  textColor,
}: IconButtonProps) => {
  return (
    <Button
      onPress={onPress}
      backgroundColor={backgroundColor}
      pressedBackgroundColor={pressedBackgroundColor}
    >
      <View style={styles.button}>
        <View style={{ width: 16 }} />
        {Icon}
        <View style={{ width: 16 }} />
        <Heading style={{ color: textColor }}>{children}</Heading>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
});
