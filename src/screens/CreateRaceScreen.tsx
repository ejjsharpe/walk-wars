import { useCreateRace } from '@/api/race/useCreateRace';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { SelectableButton } from '@/components/ui/buttons/SelectableButton';
import { SquareStarButton } from '@/components/ui/buttons/SquareStarButton';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Spacer } from '@/components/ui/Spacer';
import { Heading } from '@/components/ui/Text';
import { queryClient } from '@/lib/reactQuery';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const CreateRaceScreen = () => {
  const [raceName, setRaceName] = useState('');
  const [distance, setDistance] = useState(100000);
  const [endCondition, setEndCondition] = useState<
    'winner_finished' | 'all_finished'
  >('all_finished');
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { createRace } = useCreateRace();
  const { navigate } = useNavigation();

  const onPressContinue = () => {
    createRace(
      { name: raceName, distance, endCondition },
      {
        onSuccess: (race) => {
          queryClient.setQueryData(['race'], race);
          navigate('Lobby', { race });
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScreenHeader>CREATE RACE</ScreenHeader>
      <Spacer height={32} />
      <View style={styles.container}>
        <Heading style={{ marginLeft: 4 }}>RACE NAME</Heading>
        <Spacer height={12} />
        <Input onChangeText={setRaceName} value={raceName} />
        <Spacer height={32} />
        <Heading style={{ marginLeft: 4 }}>DISTANCE (KM)</Heading>
        <Spacer height={12} />
        <View style={styles.starButtonsContainer}>
          <SquareStarButton
            size={(width - 80) / 3}
            isSelected={distance === 100000}
            onPress={() => {
              setDistance(100000);
            }}
            text="100km"
          />
          <View style={{ width: 20 }} />
          <SquareStarButton
            size={(width - 80) / 3}
            numberOfStars={2}
            isSelected={distance === 250000}
            onPress={() => {
              setDistance(250000);
            }}
            text="250km"
          />
          <View style={{ width: 20 }} />
          <SquareStarButton
            numberOfStars={3}
            size={(width - 80) / 3}
            isSelected={distance === 500000}
            onPress={() => {
              setDistance(500000);
            }}
            text="500km"
          />
        </View>
        <Spacer height={32} />
        <Heading style={{ marginLeft: 4 }}>ENDS WHEN</Heading>
        <Spacer height={12} />
        <SelectableButton
          onPress={() => setEndCondition('all_finished')}
          isSelected={endCondition === 'all_finished'}
        >
          Everyone finishes
        </SelectableButton>
        <Spacer height={12} />
        <SelectableButton
          onPress={() => setEndCondition('winner_finished')}
          isSelected={endCondition === 'winner_finished'}
        >
          Winner finishes
        </SelectableButton>
      </View>
      <View style={[styles.stickyButtonContainer, { bottom: insets.bottom }]}>
        <PrimaryButton
          disabled={!raceName || !distance || !endCondition}
          onPress={onPressContinue}
        >
          Continue
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  starButtonsContainer: {
    flexDirection: 'row',
  },
  stickyButtonContainer: {
    paddingHorizontal: 20,
    width: '100%',
    position: 'absolute',
  },
});
