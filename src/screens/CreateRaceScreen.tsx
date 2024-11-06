import { useCreateRace } from '@/api/race/useCreateRace';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { SquareStarButton } from '@/components/ui/buttons/SquareStarButton';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { VSpace } from '@/components/ui/Spacer';
import { Heading } from '@/components/ui/Text';
import { queryClient } from '@/lib/reactQuery';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const CreateRaceScreen = () => {
  const [raceName, setRaceName] = useState('');
  const [durationDays, setDurationDays] = useState(100000);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { createRace } = useCreateRace();
  const { navigate } = useNavigation();

  const onPressContinue = () => {
    createRace(
      { name: raceName, durationDays },
      {
        onSuccess: async (race) => {
          await queryClient.setQueryData(['race'], race);
          navigate('Lobby', {
            hostId: race.host_id,
            raceId: race.id,
            raceName: race.name,
          });
        },
      }
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScreenHeader>CREATE RACE</ScreenHeader>
      <VSpace height={32} />
      <View style={styles.container}>
        <Heading style={{ marginLeft: 4 }}>RACE NAME</Heading>
        <VSpace height={12} />
        <Input onChangeText={setRaceName} value={raceName} />
        <VSpace height={32} />
        <Heading style={{ marginLeft: 4 }}>steps_to_finish (KM)</Heading>
        <VSpace height={12} />
        <View style={styles.starButtonsContainer}>
          <SquareStarButton
            size={(width - 80) / 3}
            isSelected={durationDays === 7}
            onPress={() => {
              setDurationDays(7);
            }}
            text="1 week"
          />
          <View style={{ width: 20 }} />
          <SquareStarButton
            size={(width - 80) / 3}
            numberOfStars={2}
            isSelected={durationDays === 30}
            onPress={() => {
              setDurationDays(30);
            }}
            text="1 month"
          />
          <View style={{ width: 20 }} />
          <SquareStarButton
            numberOfStars={3}
            size={(width - 80) / 3}
            isSelected={durationDays === 90}
            onPress={() => {
              setDurationDays(90);
            }}
            text="3 months"
          />
        </View>
        <VSpace height={32} />
        <Heading style={{ marginLeft: 4 }}>ENDS WHEN</Heading>
        <VSpace height={12} />
      </View>
      <View style={[styles.stickyButtonContainer, { bottom: insets.bottom }]}>
        <PrimaryButton disabled={!raceName} onPress={onPressContinue}>
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
