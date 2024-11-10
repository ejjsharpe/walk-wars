import * as Colors from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { Heading } from '../Text';
import { Button, type ButtonProps } from './Button';

interface PrimaryButtonProps extends ButtonProps {
  Icon?: JSX.Element;
}

export const PrimaryButton = ({
  onPress,
  children,
  Icon,
  ...props
}: PrimaryButtonProps) => {
  return (
    <Button
      onPress={onPress}
      pressedBackgroundColor={Colors.primaryButtonPressed}
      backgroundColor={Colors.primaryButton}
      style={styles.button}
      {...props}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {!!Icon && (
          <>
            {Icon}
            <View style={{ width: 8 }}></View>
          </>
        )}
        <Heading>{children}</Heading>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: Colors.pictonBlue,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
