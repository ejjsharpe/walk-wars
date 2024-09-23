import { useLoadedRace } from '@/api/race/useRace';
import { Dashboard } from '@/components/Dashboard';
import { HomeScreenHeader } from '@/components/HomeScreenHeader';
import { CloudSyncIconSvg } from '@/components/svg/CloudSyncIconSvg';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { Spacer } from '@/components/ui/Spacer';
import { Heading } from '@/components/ui/Text';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';

export const HomeScreen = () => {
  const { params } =
    useRoute<RouteProp<ReactNavigation.RootParamList, 'Home'>>();
  const { race } = useLoadedRace({ raceId: params.raceId });

  return (
    <View style={styles.container}>
      <HomeScreenHeader raceName={race.name} />
      <ScrollView>
        <Spacer height={28} />
        <Dashboard />
        <Spacer height={20} />
        <PrimaryButton Icon={<CloudSyncIconSvg />}>Sync Progress</PrimaryButton>
        <Spacer height={32} />
        <Heading>Activity</Heading>
        <Spacer height={20} />
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
