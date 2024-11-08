import raceEndAnimation from '@/assets/lottieAnimations/race-complete-animation.json';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { celestialBlue, pumpkinOrange } from '@/constants/Colors';
import * as Fonts from '@/constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  FadeIn,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function RaceCompleteScreen() {
  const ref = useRef<LottieView>(null);
  const { width, height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const [isTextVisible, setIsTextVisible] = useState(false);
  const { navigate } = useNavigation();

  const handleAnimationFinish = () => {
    ref.current?.play(180, 240);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.play();
      setIsTextVisible(true);
    }, 500);

    return () => clearInterval(timeout);
  }, []);

  const onPressSeeResults = () => {
    navigate('Results');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C2835',
        paddingHorizontal: 20,
      }}
    >
      <LottieView
        ref={ref}
        style={{
          height,
          width: width + 100,
          position: 'absolute',
        }}
        source={raceEndAnimation}
        speed={1}
        loop={false}
        // autoPlay={true}
        onAnimationFinish={handleAnimationFinish}
      />
      {isTextVisible && (
        <View
          style={{
            flexDirection: 'row',
            paddingTop: height / 6,
            maxWidth: '100%',
          }}
        >
          <Animated.Text
            entering={SlideInLeft.duration(1000)
              .delay(1200)
              .springify()
              .damping(14)}
            style={{
              fontSize: 72,
              color: pumpkinOrange,
              fontFamily: Fonts.Nikeflix,
            }}
          >
            Race{' '}
          </Animated.Text>
          <Animated.Text
            entering={SlideInRight.duration(1000)
              .delay(1600)
              .springify()
              .damping(16)}
            style={{
              fontSize: 72,
              color: celestialBlue,
              fontFamily: Fonts.Nikeflix,
            }}
          >
            Complete
          </Animated.Text>
        </View>
      )}
      <Animated.View
        entering={FadeIn.delay(2200).duration(800)}
        style={{ position: 'absolute', bottom, width: '100%' }}
      >
        <PrimaryButton onPress={onPressSeeResults}>Continue</PrimaryButton>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  raceCompleteText: {},
});
