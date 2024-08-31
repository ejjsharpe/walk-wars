import { TickButtonSvg } from '@/components/svg/TickButtonSvg';
import { Pressable, PressableProps } from 'react-native';

export const TickButton = (props: PressableProps) => {
  return (
    <Pressable {...props}>
      <TickButtonSvg />
    </Pressable>
  );
};
