import { useLoadedRace } from '@/api/race/useRace';
import { useRacePlayersSuspense } from '@/api/race/useRacePlayers';
import { usePostStepLogs } from '@/api/stepLogs/usePostStepLogs';
import { useStepCount } from '@/api/stepLogs/useStepCount';
import { useLoadedUser } from '@/api/user/useUser';
import { Dashboard } from '@/components/Dashboard';
import { HomeScreenHeader } from '@/components/HomeScreenHeader';
import { CloudSyncIconSvg } from '@/components/svg/CloudSyncIconSvg';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { VSpace } from '@/components/ui/Spacer';
import { Heading } from '@/components/ui/Text';
import { Suspense } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export const HomeScreen = () => {
  const { race } = useLoadedRace();
  const { user } = useLoadedUser();
  const { postStepLogs } = usePostStepLogs();
  const { stepsToday, totalSteps } = useStepCount();
  const { racePlayers } = useRacePlayersSuspense();
  const currentPosition =
    racePlayers.findIndex((player) => player.id === user.id) + 1;

  return (
    <View style={styles.container}>
      <HomeScreenHeader raceName={race.name} />
      <ScrollView>
        <Suspense>
          <VSpace height={28} />
          <Dashboard
            stepsToday={stepsToday}
            percentComplete={totalSteps}
            racePosition={currentPosition}
          />
          <VSpace height={20} />
          <PrimaryButton
            onPress={() => postStepLogs()}
            Icon={<CloudSyncIconSvg />}
          >
            Sync Progress
          </PrimaryButton>
          <VSpace height={32} />
          <Heading>Activity</Heading>
          <VSpace height={20} />
        </Suspense>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  progressContainer: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
