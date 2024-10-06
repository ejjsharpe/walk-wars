import { StarSvg } from '@/components/svg/StarSvg';
import * as Colors from '@/constants/Colors';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Text';

interface SquareStarButton {
  isSelected: boolean;
  onPress: () => void;
  size: number;
  numberOfStars?: 1 | 2 | 3;
  text: string;
}

export const SquareStarButton = ({
  isSelected,
  onPress,
  size = 100,
  numberOfStars = 1,
  text,
}: SquareStarButton) => {
  const sizes = {
    1: size / 2.173611111111111,
    2: size / 2.5,
    3: size / 3.3,
  };
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderColor: isSelected ? Colors.celestialBlue : Colors.paynesGrey,
          backgroundColor: isSelected ? Colors.electricBlue : 'transparent',
        },
      ]}
      onPress={onPress}
    >
      <View
        style={{
          alignItems: 'center',
          height: size / 1.85,
          justifyContent: 'center',
        }}
      >
        {numberOfStars === 3 && (
          <StarSvg
            size={sizes[numberOfStars]}
            strokeColor={isSelected ? Colors.white : Colors.paynesGrey}
            fill={isSelected ? Colors.white : 'transparent'}
          />
        )}
        <View style={{ flexDirection: 'row' }}>
          {[...Array(numberOfStars === 3 ? 2 : numberOfStars).keys()].map(
            (star) => (
              <StarSvg
                key={star}
                size={sizes[numberOfStars]}
                strokeColor={isSelected ? Colors.white : Colors.paynesGrey}
                fill={isSelected ? Colors.white : 'transparent'}
              />
            )
          )}
        </View>
      </View>
      <Text
        style={{
          color: isSelected ? Colors.white : Colors.paynesGrey,
          marginTop: 2,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
