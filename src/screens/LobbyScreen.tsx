import { useLobbyPlayersSuspense } from '@/api/race/useLobbyPlayers';
import { useLoadedRace, useRace } from '@/api/race/useRace';
import { useStartRace } from '@/api/race/useStartRace';
import { useLoadedUser } from '@/api/user/useUser';
import { PlayerLobbyCard } from '@/components/PlayerLobbyCard';
import { PrimaryButton } from '@/components/ui/buttons/PrimaryButton';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Spacer } from '@/components/ui/Spacer';
import { Heading, Text } from '@/components/ui/Text';
import * as Colors from '@/constants/Colors';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Suspense, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../App';

export const LobbyScreen = () => {
  const [userToInvite, setUserToInvite] = useState('');
  const { params } =
    useRoute<
      RouteProp<RootStackParamList & { [key: string]: undefined }, 'Lobby'>
    >();
  const { user } = useLoadedUser();
  const { lobbyPlayers } = useLobbyPlayersSuspense({ raceId: params.raceId });
  const isHost = params.hostId === user.id;
  const { race } = useLoadedRace({
    raceId: params.raceId,
    refetchInterval: isHost ? undefined : 5000,
  });

  const { reset } = useNavigation();
  const { startRace } = useStartRace();

  useEffect(() => {
    if (!!race.started_at) {
      reset({ routes: [{ name: 'Main Tabs', params: { raceId: race.id } }] });
    }
  }, [race.id, race.started_at, reset]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScreenHeader>{params.raceName}</ScreenHeader>
      <View style={styles.screenWidth}>
        <Spacer height={32} />
        <Heading style={{ marginLeft: 4 }}>INVITE</Heading>
        <Spacer height={8} />
        <Input
          value={userToInvite}
          onChangeText={setUserToInvite}
          placeholder="Player name"
        />
        <Spacer height={32} />
      </View>
      <Heading style={styles.playersHeading}>PLAYERS</Heading>
      <Spacer height={12} />
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
      <Spacer height={20} />
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
