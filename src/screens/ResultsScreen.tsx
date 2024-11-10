import { useExitRace } from '@/api/race/useExitRace';
import { useRacePlayersSuspense } from '@/api/race/useRacePlayers';
import { useUserRaceDetailsSuspense } from '@/api/race/useUserRaceDetails';
import { Leaderboard } from '@/components/Leaderboard';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { VSpace } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { useNavigation } from '@react-navigation/native';
import { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ResultsScreen() {
  const { racePlayers } = useRacePlayersSuspense();
  const { userRaceDetails } = useUserRaceDetailsSuspense();
  const { exitRaceAsync } = useExitRace();
  const { reset } = useNavigation();

  const isAllPlayersFinished = racePlayers.every(
    (player) => player.is_finished
  );

  const onPressExitRace = async () => {
    await exitRaceAsync();
    reset({ routes: [{ name: 'Loading' }] });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScreenHeader hideBackButton>Leaderboard</ScreenHeader>
      <VSpace height={20} />
      {!isAllPlayersFinished ? (
        <Text>
          We're still waiting on a few players to log all of their steps before
          we can declare the scores. Here's what we have so far...
        </Text>
      ) : (
        <Text>
          Congratulations! You came {userRaceDetails?.finish_position}.
        </Text>
      )}
      <VSpace height={20} />
      <Suspense fallback={<Text>Loading...</Text>}>
        <Leaderboard data={racePlayers} />
      </Suspense>
      <PrimaryButton onPress={onPressExitRace}>Exit race</PrimaryButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
