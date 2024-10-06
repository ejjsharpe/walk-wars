import * as Colors from '@/constants/Colors';
import { useState } from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export interface ButtonProps extends PressableProps {
  children: string | React.ReactNode;
  backgroundColor?: string;
  pressedBackgroundColor?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  children,
  onPress,
  backgroundColor,
  pressedBackgroundColor,
  disabled,
}: ButtonProps) {
  const sv = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: sv.value }],
      backgroundColor: disabled
        ? Colors.paynesGrey
        : interpolateColor(
            sv.value,
            [0.98, 1],
            [
              pressedBackgroundColor || '#38B3E0B3',
              backgroundColor || Colors.pictonBlue,
            ]
          ),
    };
  });

  const onPressIn = () => {
    sv.value = withSpring(0.98, {
      damping: 1,
      stiffness: 200,
      mass: 0.4,
    });
  };

  const onPressOut = () => {
    sv.value = withSpring(1, {
      damping: 1,
      stiffness: 180,
      mass: 1,
    });
  };

  return (
    <AnimatedPressable
      style={[styles.button, { opacity: disabled ? 0.5 : 1 }, animatedStyle]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: Colors.pictonBlue,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
