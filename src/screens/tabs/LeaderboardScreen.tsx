import { useRacePlayersSuspense } from '@/api/race/useRacePlayers';
import { LeaderboardCard } from '@/components/LeaderboardCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { VSpace } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { FlashList } from '@shopify/flash-list';
import { Suspense, useCallback } from 'react';
import { View } from 'react-native';
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
  const { racePlayers } = useRacePlayersSuspense();

  const renderItem = useCallback(
    ({ item, index }: { item: RacePlayer; index: number }) => {
      return (
        <LeaderboardCard
          avatarUrl={item.avatar!}
          numberOfSteps={item.adjusted_step_count}
          position={index + 1}
          username={item.display_name!}
          key={item.id}
        />
      );
    },
    []
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader hideBackButton>Leaderboard</ScreenHeader>
      <VSpace height={20} />
      <Suspense fallback={<Text>Loading...</Text>}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            width: '100%',
          }}
        >
          <FlashList
            data={racePlayers}
            renderItem={renderItem}
            estimatedItemSize={200}
          />
        </View>
      </Suspense>
    </SafeAreaView>
  );
};
