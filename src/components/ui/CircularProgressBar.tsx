import * as Colors from '@/constants/Colors';
import * as Fonts from '@/constants/Fonts';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressBarProps {
  size?: number;
  strokeWidth?: number;
  percentComplete: number;
  backgroundStrokeColor?: string;
  foregroundStrokeColor?: string;
}

export default function CircularProgressBar({
  size = 92,
  strokeWidth = 12,
  percentComplete,
  backgroundStrokeColor = Colors.squidInkNavy,
  foregroundStrokeColor = Colors.pumpkinOrange,
}: CircularProgressBarProps) {
  const trueDiameter = size - strokeWidth;
  const radius = trueDiameter / 2;
  const circumference = Math.PI * 2 * radius;

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  useEffect(() => {
    progress.value = withTiming(percentComplete / 100, {
      duration: 2000,
    });
  }, [circumference, percentComplete, progress]);

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}%`;
  });

  return (
    <View>
      <ReText
        style={styles.progressText}
        text={progressText}
        allowFontScaling={false}
      />
      <Svg width={size} height={size}>
        <Circle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke={backgroundStrokeColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={radius + strokeWidth / 2}
          cy={radius + strokeWidth / 2}
          r={radius}
          stroke={foregroundStrokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
          fill="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  progressText: {
    fontSize: 32,
    lineHeight: 34,
    color: '#FFF',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    fontFamily: Fonts.Nikeflix,
  },
});
