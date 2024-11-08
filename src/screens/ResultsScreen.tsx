import { useRacePlayersSuspense } from '@/api/race/useRacePlayers';
import { useUserRaceDetails } from '@/api/race/useUserRaceDetails';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Text } from '@/components/ui/Text';
import { Suspense } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export function ResultsScreen() {
  const { racePlayers } = useRacePlayersSuspense();
  const { userRaceDetails } = useUserRaceDetails();

  const isAllPlayersFinished = racePlayers.every(
    (player) => player.is_finished
  );

  return (
    <SafeAreaView>
      <Suspense fallback={<Text>Loading...</Text>}>
        <ScreenHeader>Results</ScreenHeader>
        {isAllPlayersFinished ? (
          <Text>
            We're still waiting on a few players to log all of their steps
            before we can declare the scores. Here's what we have so far...
          </Text>
        ) : (
          <Text>Congratulations! You came .</Text>
        )}
      </Suspense>
    </SafeAreaView>
  );
}
