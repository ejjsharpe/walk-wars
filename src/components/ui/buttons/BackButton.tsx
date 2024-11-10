import * as Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Pressable, PressableProps } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
interface BackButtonProps {
  style?: PressableProps['style'];
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const BackButton = ({ style }: BackButtonProps) => {
  const { goBack } = useNavigation();

  const sv = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: sv.value }],
      color: interpolateColor(
        sv.value,
        [0.98, 1],
        [Colors.backButtonPressed, Colors.backButton]
      ),
    };
  });

  const onPressIn = () => {
    sv.value = withSpring(0.98, {
      damping: 1,
      stiffness: 120,
      mass: 0.4,
    });
  };

  const onPressOut = () => {
    sv.value = withSpring(1, {
      damping: 1,
      stiffness: 120,
      mass: 0.8,
    });
  };

  return (
    <Pressable onPress={goBack} onPressIn={onPressIn} onPressOut={onPressOut}>
      <AnimatedSvg width={40} height={40} fill="none" style={animatedStyles}>
        <Path
          fill="currentColor"
          fillRule="evenodd"
          d="M20 2.083C10.105 2.083 2.083 10.105 2.083 20c0 9.895 8.022 17.917 17.917 17.917 9.895 0 17.917-8.022 17.917-17.917 0-9.895-8.022-17.916-17.917-17.916Zm-1.717 24.634-5.834-5.833a1.25 1.25 0 0 1 0-1.768l5.834-5.833a1.25 1.25 0 0 1 1.767 1.768l-3.699 3.7h10.316a1.25 1.25 0 1 1 0 2.5H16.35l3.7 3.699a1.25 1.25 0 1 1-1.768 1.767Z"
          clipRule="evenodd"
        />
      </AnimatedSvg>
    </Pressable>
  );
};
