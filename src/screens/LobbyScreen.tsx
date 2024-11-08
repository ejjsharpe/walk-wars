import { useLobbyPlayersSuspense } from '@/api/race/useLobbyPlayers';
import { useRace } from '@/api/race/useRace';
import { useStartRace } from '@/api/race/useStartRace';
import { useLoadedUser } from '@/api/user/useUser';
import { PlayerLobbyCard } from '@/components/PlayerLobbyCard';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { VSpace } from '@/components/ui/Spacer';
import { Heading, Text } from '@/components/ui/Text';
import * as Colors from '@/constants/Colors';
import { AuthenticatedStackParamList } from '@/navigation/AuthenticatedStack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Suspense, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

export const LobbyScreen = () => {
  const [userToInvite, setUserToInvite] = useState('');
  const { user } = useLoadedUser();
  const route = useRoute<RouteProp<AuthenticatedStackParamList, 'Lobby'>>();
  const { raceId, raceName } = route.params;
  const { race } = useRace({ raceId });
  const { lobbyPlayers } = useLobbyPlayersSuspense();
  const isHost = race?.host_id === user.id;
  const { reset } = useNavigation();
  const { startRace } = useStartRace();

  useEffect(() => {
    if (!!race?.start_timestamp) {
      reset({ routes: [{ name: 'Main Tabs', params: { raceId: raceId } }] });
    }
  }, [race?.start_timestamp, raceId, reset]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScreenHeader>{raceName}</ScreenHeader>
      <View style={styles.screenWidth}>
        <VSpace height={32} />
        <Heading style={{ marginLeft: 4 }}>INVITE</Heading>
        <VSpace height={8} />
        <Input
          value={userToInvite}
          onChangeText={setUserToInvite}
          placeholder="Player name"
        />
        <VSpace height={32} />
      </View>
      <Heading style={styles.playersHeading}>PLAYERS</Heading>
      <VSpace height={12} />
      <ScrollView style={styles.screenWidth}>
        <Suspense fallback={<Text>Loading...</Text>}>
          {lobbyPlayers.map(
            ({ avatar, display_name, status, user_id, color }) => {
              return (
                <PlayerLobbyCard
                  key={user_id}
                  playerName={display_name}
                  avatar={avatar}
                  status={status as 'pending' | 'ready'}
                  playerColor={color}
                />
              );
            }
          )}
        </Suspense>
      </ScrollView>
      <VSpace height={20} />
      <View style={[styles.screenWidth, { alignItems: 'center' }]}>
        <Suspense fallback={<Text>Loading...</Text>}>
          {isHost ? (
            <PrimaryButton onPress={() => startRace({ raceId: race.id })}>
              Create Race
            </PrimaryButton>
          ) : (
            <Heading style={{ color: Colors.pumpkinOrange }}>
              Waiting for the host to start the race
            </Heading>
          )}
        </Suspense>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  screenWidth: {
    paddingHorizontal: 20,
    width: '100%',
  },
  playersHeading: {
    alignSelf: 'flex-start',
    marginLeft: 24,
  },
});
