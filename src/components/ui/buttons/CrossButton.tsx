import { CrossButtonSvg } from '@/components/svg/CrossButtonSvg';
import { Pressable, PressableProps } from 'react-native';

export const CrossButton = (props: PressableProps) => {
  return (
    <Pressable {...props}>
      <CrossButtonSvg />
    </Pressable>
  );
};
