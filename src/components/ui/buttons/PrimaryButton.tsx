import { View } from 'react-native';
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
    <Button onPress={onPress} {...props}>
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
