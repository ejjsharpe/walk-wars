import { AppleLogoSvg } from '../../svg/AppleLogoSvg';
import { IconButton } from './IconButton';

export const SignInWithAppleButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <IconButton
      Icon={<AppleLogoSvg />}
      onPress={onPress}
      backgroundColor="#000"
      pressedBackgroundColor="#00000080"
      textColor="#fff"
    >
      sign in with apple
    </IconButton>
  );
};
