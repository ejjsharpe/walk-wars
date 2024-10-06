import { useRacePlayers } from '@/api/race/useRacePlayers';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { VSpace } from '@/components/ui/Spacer';
import { useCurrentRaceContext } from '@/contexts/CurrentRaceContext';

import { FlashList } from '@shopify/flash-list';
import { Suspense, useCallback } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

interface RacePlayer {
  display_name?: string | null | undefined;
  avatar?: string | null | undefined;
  color?: string | null | undefined;
  id?: string | undefined;
  finish_position: number | null;
  total_step_count: number;
  adjusted_step_count: number;
}

export const LeaderboardScreen = () => {
  const race = useCurrentRaceContext();
  const { racePlayers } = useRacePlayers();

  const renderItem = useCallback(
    ({ item, index }: { item: RacePlayer; index: number }) => {
      return (
        <LeaderboardCard
          avatarUrl={item.avatar!}
          numberOfSteps={item.adjusted_step_count}
          position={index + 1}
          username={item.display_name!}
          key={item.id}
          totalStepsInRace={race.steps_to_finish!}
        />
      );
    },
    [race.steps_to_finish]
  );

  return (
    <SafeAreaView>
      <ScreenHeader hideBackButton>Leaderboard</ScreenHeader>
      <VSpace height={20} />
      <Suspense>
        <FlashList
          data={racePlayers}
          renderItem={renderItem}
          estimatedItemSize={200}
        />
      </Suspense>
    </SafeAreaView>
  );
};
