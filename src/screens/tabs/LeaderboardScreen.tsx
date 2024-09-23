import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Spacer } from '@/components/ui/Spacer';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LeaderboardScreen = () => {
  return (
    <SafeAreaView>
      <ScreenHeader hideBackButton>Leaderboard</ScreenHeader>
      <Spacer height={20} />
    </SafeAreaView>
  );
};
