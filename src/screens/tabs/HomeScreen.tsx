import { useLoadedRace } from '@/api/race/useRace';
import { usePostStepLogs } from '@/api/stepLogs/usePostStepLogs';
import { Dashboard } from '@/components/Dashboard';
import { HomeScreenHeader } from '@/components/HomeScreenHeader';
import { CloudSyncIconSvg } from '@/components/svg/CloudSyncIconSvg';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { VSpace } from '@/components/ui/Spacer';
import { Heading } from '@/components/ui/Text';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';

export const HomeScreen = () => {
  const { params } =
    useRoute<RouteProp<ReactNavigation.RootParamList, 'Home'>>();
  const { race } = useLoadedRace({ raceId: params.raceId });
  usePostStepLogs({ raceId: params.raceId });

  return (
    <View style={styles.container}>
      <HomeScreenHeader raceName={race.name} />
      <ScrollView>
        <VSpace height={28} />
        <Dashboard />
        <VSpace height={20} />
        <PrimaryButton Icon={<CloudSyncIconSvg />}>Sync Progress</PrimaryButton>
        <VSpace height={32} />
        <Heading>Activity</Heading>
        <VSpace height={20} />
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
