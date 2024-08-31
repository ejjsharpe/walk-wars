import { Heading } from '../Text';
import { Button, type ButtonProps } from './Button';

export const PrimaryButton = ({ onPress, children, ...props }: ButtonProps) => {
  return (
    <Button onPress={onPress} {...props}>
      <Heading>{children}</Heading>
    </Button>
  );
};
