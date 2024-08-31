import { GoogleGSvg } from '../../svg/GoogleGSvg';
import { IconButton } from './IconButton';

export const SignInWithGoogleButton = ({
  onPress,
}: {
  onPress: () => void;
}) => {
  return (
    <IconButton
      Icon={<GoogleGSvg />}
      onPress={onPress}
      backgroundColor="#fff"
      pressedBackgroundColor="#ffffff80"
      textColor="#00000080"
    >
      sign in with google
    </IconButton>
  );
};
