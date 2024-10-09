import { useRace } from '@/api/race/useRace';
import { useUserRaceDetails } from '@/api/race/useUserRaceDetails';
import { useUser } from '@/api/user/useUser';
import { Heading } from '@/components/ui/Text';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View } from 'react-native';

export const Loading = () => {
  const { user, isUserPending } = useUser();
  const { userRaceDetails, isUserRaceDetailsPending } = useUserRaceDetails();
  const { race } = useRace({ raceId: userRaceDetails?.race_id });
  const { reset } = useNavigation();

  useEffect(() => {
    if (isUserPending || isUserRaceDetailsPending) return;

    if (!user?.avatar || !user?.display_name) {
      reset({ routes: [{ name: 'Profile' }] });
      return;
    }

    if (!userRaceDetails) {
      reset({ routes: [{ name: 'No Race' }] });
      return;
    }

    if (race && !race.started_at) {
      reset({
        routes: [
          {
            name: 'Lobby',
            params: {
              raceId: race.id,
              raceName: race.name,
              hostId: race.host_id,
            },
          },
        ],
      });
      return;
    }

    if (race) {
      reset({
        routes: [
          { name: 'Main Tabs', params: { raceId: race.id, userId: user.id } },
        ],
      });
    }
  }, [
    isUserPending,
    isUserRaceDetailsPending,
    race,
    reset,
    user?.avatar,
    user?.display_name,
    user?.id,
    userRaceDetails,
  ]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Heading>Loading...</Heading>
    </View>
  );
};
