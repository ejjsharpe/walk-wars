import { BackButtonSvg } from '@/components/svg/BackButtonSvg';
import { useNavigation } from '@react-navigation/native';
import { Pressable, PressableProps } from 'react-native';

interface BackButtonProps {
  style?: PressableProps['style'];
}

export const BackButton = ({ style }: BackButtonProps) => {
  const { goBack } = useNavigation();

  return (
    <Pressable onPress={goBack} style={style}>
      <BackButtonSvg />
    </Pressable>
  );
};
