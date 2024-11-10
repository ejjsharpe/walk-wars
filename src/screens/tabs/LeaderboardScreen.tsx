import { useRacePlayersSuspense } from '@/api/race/useRacePlayers';
import { Leaderboard } from '@/components/Leaderboard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { VSpace } from '@/components/ui/Spacer';
import { Text } from '@/components/ui/Text';
import { Suspense } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LeaderboardScreen = () => {
  const { racePlayers } = useRacePlayersSuspense();

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
          <Leaderboard data={racePlayers} />
        </View>
      </Suspense>
    </SafeAreaView>
  );
};
